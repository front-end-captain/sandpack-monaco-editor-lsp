import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackSetup,
  SandpackPredefinedTemplate,
  SandpackFiles,
} from "@codesandbox/sandpack-react";
import { Editor } from "./editor";
// import { ReactMonacoEditor as Editor } from "./editor";

export const SandpackTypescript: React.FC<{
  customSetup: SandpackSetup;
  template: SandpackPredefinedTemplate;
  files: SandpackFiles;
}> = ({ customSetup, template, files }) => {
  return (
    <SandpackProvider
      template={template}
      customSetup={customSetup}
      files={files}
    >
      <SandpackLayout style={{ width: "100vw" }}>
        {/* <Editor width="100%" height="100%" /> */}
        <Editor />
        <SandpackPreview style={{ height: "50vh" }} />
      </SandpackLayout>
    </SandpackProvider>
  );
};
