import { SandpackTypescript } from "../sandpack-ts";

export function SandpackReact() {
  return (
    <SandpackTypescript
      customSetup={{
        dependencies: {
          "@chakra-ui/react": "latest",
          "@emotion/react": "latest",
          "@emotion/styled": "latest",
          "framer-motion": "latest",
        },
      }}
      files={{
        "/App.tsx": `import React from "react"
import { Flex } from '@chakra-ui/react'

export default function App(): JSX.Element {
return (
<Flex 
  w="100vw" 
  h="100vh" 
  justifyContent="center" 
  alignItems
>
  <h2>Hello world!</h2>
</Flex>
)
}`,
      }}
      template="react-ts"
    />
  );
}
