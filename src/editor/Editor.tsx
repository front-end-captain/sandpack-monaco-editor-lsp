import { useRef, useEffect } from "react";
import type { FunctionComponent, HTMLAttributes } from "react";
import ReactEditor from "@monaco-editor/react";
import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import {
  useActiveCode,
  useSandpack,
  SandpackStack,
} from "@codesandbox/sandpack-react";
import { EventEmitter } from "@okikio/emitter";

type TMonaco = typeof Monaco;

interface CompletionItem {
  kind: string;
  kindmodifiers: string;
  name: string;
  replacementspan: { start: number; length: number };
  sorttext: string;
}
interface CompletionInfo {
  entries: CompletionItem[];
  isglobalcompletion: boolean;
  ismembercompletion: boolean;
  isnewidentifierlocation: boolean;
  optionalreplacementspan: {
    length: number;
    start: number;
  };
}

export interface EditorProps {
  // code: string;
  // libsCode: string[];
  // onEditorChange: (value: string | undefined) => void;
  attributes?: HTMLAttributes<HTMLDivElement>;
  width?: string | number;
  height?: string | number;
}

function registerTSCompletionItemProvider(
  languages: typeof Monaco.languages,
  filename: string,
  tsServer: Worker,
  emitter: EventEmitter
) {
  languages.registerCompletionItemProvider("typescript", {
    triggerCharacters: ["'", '"'],
    provideCompletionItems: async (_model, position) => {
      // const textUntilPosition = model.getValueInRange({
      //   startLineNumber: 1,
      //   startColumn: 1,
      //   endLineNumber: position.lineNumber,
      //   endColumn: position.column,
      // });

      tsServer.postMessage({
        event: "autocomplete-request",
        details: { pos: position, filePath: filename },
      });

      const completionInfo: CompletionInfo = await new Promise((resolve) => {
        emitter.on("autocomplete-results", (completions) => {
          // console.log('completions', completions)
          resolve(completions);
        });
      });
      if (!completionInfo || !completionInfo.entries) {
        return { suggestions: [] };
      }

      return {
        suggestions: completionInfo.entries.map((entry) => {
          return {
            label: entry.name,
            kind: 13,
            insertText: entry.name,
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            },
          };
        }),
      };
    },
  });
}

function setTSLanguages(languages: typeof Monaco.languages) {
  languages.register({
    id: "typescript",
    extensions: [".ts"],
  });
  languages.register({
    id: "javascript",
    extensions: [".js"],
  });
  languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
  languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
  languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: "file:///",
    // rootDir: "/",
    allowJs: true,
    target: languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
    module: languages.typescript.ModuleKind.ESNext,
    noEmit: true,
    jsx: 2,
    lib: ["dom", "es2015"],
    paths: {
      "*": ["*"],
    },
  });
  languages.typescript.typescriptDefaults.setEagerModelSync(true);
}

export const Editor: FunctionComponent<EditorProps> = (props) => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  const tsServer = useRef(
    new Worker(new URL("/workers/tsserver.js", window.location.origin), {
      name: "ts-server",
    })
  );
  const emitter = useRef(new EventEmitter());

  const handleChange = (val?: string) => {
    updateCode(val || "");
  };

  const handleEditorMount = async (
    editor: Monaco.editor.IStandaloneCodeEditor,
    monaco: TMonaco
  ) => {
    setTSLanguages(monaco.languages);
    const mainModelUri = monaco.Uri.parse(`file://src${sandpack.activeFile}`);
    let mainModel = monaco.editor.getModel(mainModelUri);
    if (!mainModel) {
      mainModel = monaco.editor.createModel(code, "typescript", mainModelUri);
      editor.setModel(mainModel);
    }

    // const getTSWorker = await monaco.languages.typescript.getTypeScriptWorker();
    // const tsWorker = await getTSWorker(mainModel.uri);
    registerTSCompletionItemProvider(
      monaco.languages,
      mainModel.uri.toString(),
      tsServer.current,
      emitter.current
    );
  };

  useEffect(function listener() {
    const serverMessageCallback = ({
      data: { event, details },
    }: MessageEvent<{ event: string; details: any }>) => {
      // console.log("emit", event, details);
      emitter.current.emit(event, details);
    };

    tsServer.current.addEventListener("message", serverMessageCallback);

    return () => {
      tsServer.current.removeEventListener("message", serverMessageCallback);
    };
  }, []);

  useEffect(function init() {
    emitter.current.on("ready", () => {
      const getTypescriptCache = () => {
        const cache = new Map();
        const keys = Object.keys(localStorage);

        keys.forEach((key) => {
          if (key.startsWith("ts-lib-")) {
            cache.set(key, localStorage.getItem(key));
          }
        });

        return cache;
      };

      const details = {
        files: sandpack.files,
        entry: sandpack.activeFile,
        fsMapCached: getTypescriptCache(),
      };
      // console.log("details", details);
      tsServer.current.postMessage({
        event: "create-system",
        details,
      });
    });

    emitter.current.on(
      "cache-typescript-fsmap",
      ({ version, fsMap }: { version: string; fsMap: Map<string, string> }) => {
        fsMap.forEach((file, lib) => {
          const cacheKey = "ts-lib-" + version + "-" + lib;
          localStorage.setItem(cacheKey, file);
        });
      }
    );
    tsServer.current.postMessage({
      event: "updateText",
      details: {
        filePath: sandpack.activeFile,
        content: code,
      },
    })
  }, []);

  // console.log(sandpack);

  return (
    <SandpackStack style={{ height: "50vh", margin: 0 }}>
      <div style={{ flex: 1 }}>
        <ReactEditor
          key={sandpack.activeFile}
          height={props.height}
          width={props.width}
          defaultLanguage="typescript"
          defaultValue={code}
          value={code}
          onMount={handleEditorMount}
          onChange={handleChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            lineNumbers: "on",
            tabSize: 2,
          }}
          wrapperProps={{ ...(props.attributes || {}) }}
        />
      </div>
    </SandpackStack>
  );
};
