import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackSetup,
  SandpackPredefinedTemplate,
  SandpackFiles,
  // SandpackCodeEditor as Editor,
  SandpackOptions,
} from "@codesandbox/sandpack-react";
// import { Editor } from "./editor";
import { JsEditor as Editor } from "./editor";
// import { ReactMonacoEditor as Editor } from "./editor";

export const SandpackTypescript: React.FC<{
  customSetup?: SandpackSetup;
  template: SandpackPredefinedTemplate;
  files: SandpackFiles;
  options?: SandpackOptions;
}> = ({ customSetup, template, files, options }) => {
  return (
    <SandpackProvider
      template={template}
      customSetup={customSetup}
      files={files}
      options={{...options, classes: {
        "sp-wrapper": "my-sp-wrapper"
      }}}
    >
      <SandpackLayout style={{ width: "100%", height: "100%" }}>
        {/* <Editor width="100%" height="100%" /> */}
        <Editor />
        <SandpackPreview style={{  width: "100%", height: "100%"  }} />
      </SandpackLayout>
    </SandpackProvider>
  );
};
