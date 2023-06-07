// import "monaco-editor/esm/vs/editor/edcore.main.js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { MonacoLanguageClient } from "monaco-languageclient";
import {
  BrowserMessageReader,
  BrowserMessageWriter,
} from "vscode-languageserver-protocol/browser.js";
import {
  CloseAction,
  ErrorAction,
  MessageTransports,
} from "vscode-languageclient";
// import "vscode/default-extensions/theme-defaults";

import { useRef, useEffect } from "react";
import {
  useActiveCode,
  useSandpack,
  SandpackStack,
} from "@codesandbox/sandpack-react";

function createLanguageClient(
  transports: MessageTransports
): MonacoLanguageClient {
  return new MonacoLanguageClient({
    name: "Sample Language Client",
    clientOptions: {
      // use a language id as a document selector
      documentSelector: ["typescript"],
      // disable the default error handler
      errorHandler: {
        error: () => ({ action: ErrorAction.Continue }),
        closed: () => ({ action: CloseAction.DoNotRestart }),
      },
    },
    // create a language client connection from the JSON RPC connection on demand
    connectionProvider: {
      get: () => {
        return Promise.resolve(transports);
      },
    },
  });
}

export const ReactMonacoEditor: React.FC = () => {
  const { code, updateCode } = useActiveCode();
  // const { sandpack } = useSandpack();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current != null) {
      // register Monaco languages
      monaco.languages.register({
        id: "typescript",
        extensions: [".ts", ".tsx"],
        aliases: ["TypeScript", "ts", "TS", "Typescript", "typescript"],
      });

      // create Monaco editor
      // console.log("create Monaco editor", editorRef.current, container.current);

      // const modelUri = monaco.Uri.parse(sandpack.activeFile);
      // const model = editorRef.current?.getModel();
      // if (model) {
      //   model.dispose();
      // }
      editorRef.current = monaco.editor.create(container.current, {
        // model: model
        //   ? undefined
        //   : monaco.editor.createModel(
        //       code,
        //       "typescript",
        //       monaco.Uri.parse(sandpack.activeFile)
        //     ),
        value: code,
        language: "typescript",
        fontSize: 14,
        glyphMargin: true,
        lightbulb: {
          enabled: true,
        },
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
        theme: "vs-light",
      });
      // console.log("after editor mount", editorRef.current);

      editorRef.current.onDidChangeModelContent(() => {
        updateCode(editorRef.current?.getValue() || "");
      });

      const tsServer = new Worker(
        new URL("/workers/tsWorker-es.js", window.location.origin),
        {
          name: "ts-server",
          // type: "classic",
          type: "module",
        }
      );
      if (window.MonacoEnvironment) {
        window.MonacoEnvironment.getWorker = () => tsServer;
      }
      const reader = new BrowserMessageReader(tsServer);
      const writer = new BrowserMessageWriter(tsServer);
      const languageClient = createLanguageClient({ reader, writer });
      languageClient.start();
      reader.onClose(() => languageClient.stop());
    }
  }, []);
  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        const model = editorRef.current.getModel();
        if (model) {
          model.dispose();
        }
      }
    };
  }, []);
  // console.log('sandpack', sandpack);

  return (
    <SandpackStack style={{ height: "50vh", margin: 0 }}>
      <div ref={container} style={{ height: "100%", width: "100%" }} />
    </SandpackStack>
  );
};
