import type { FunctionComponent, HTMLAttributes } from "react";
import ReactEditor from "@monaco-editor/react";
import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import {
  useActiveCode,
  useSandpack,
  SandpackStack,
} from "@codesandbox/sandpack-react";

type TMonaco = typeof Monaco;

export interface EditorProps {
  // code: string;
  // libsCode: string[];
  // onEditorChange: (value: string | undefined) => void;
  attributes?: HTMLAttributes<HTMLDivElement>;
  width?: string | number;
  height?: string | number;
}

export const Editor: FunctionComponent<EditorProps> = (props) => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  const handleChange = (val?: string) => {
    updateCode(val || "");
  };

  const handleEditorMount = async (
    editor: Monaco.editor.IStandaloneCodeEditor,
    monaco: TMonaco
  ) => {
    const mainModelUri = monaco.Uri.parse(`file://src${sandpack.activeFile}`);
    let mainModel = monaco.editor.getModel(mainModelUri);
    if (!mainModel) {
      mainModel = monaco.editor.createModel(code, "javascript", mainModelUri);
      editor.setModel(mainModel);
    }
  };

  return (
    <SandpackStack style={{ height: "50vh", margin: 0 }}>
      <div style={{ flex: 1 }}>
        <ReactEditor
          key={sandpack.activeFile}
          height={props.height}
          width={props.width}
          defaultLanguage="javascript"
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
