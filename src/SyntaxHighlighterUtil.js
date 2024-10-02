import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

SyntaxHighlighter.registerLanguage("javascript", js);

export const CodeBlock = ({ children }) => (
  <SyntaxHighlighter
    language="javascript"
    style={docco}
    customStyle={{
      backgroundColor: "#f0f0f0",
      padding: "1rem",
      borderRadius: "0.5rem",
      overflow: "auto",
    }}
  >
    {children}
  </SyntaxHighlighter>
);

export { SyntaxHighlighter, docco };
