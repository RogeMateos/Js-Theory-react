import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import ArrayMethods from "./theory/ArrayMethods";
import { CodeBlock, SyntaxHighlighter, docco } from "./SyntaxHighlighterUtil";
import Closures from "./theory/Closures";
import Coercion from "./theory/Coercion";
import DataTypesDynamicTyping from "./theory/DataTypesDynamicTyping";
import Destructuring from "./theory/Destructuring";
import DefaultValues from "./theory/DefaultValues";
import Hoisting from "./theory/Hoisting";
import JsonObject from "./theory/JsonObject";
import LexicalExecution from "./theory/LexicalExecution";
import Memoization from "./theory/Memoization";
import NullandUndefined from "./theory/NullandUndefined";
import ObjectsPrimitive from "./theory/ObjectsPrimitive";
import PrecedenceAssociability from "./theory/PrecedenceAssociability";
import Promises from "./theory/Promises";
import ReferenceValue from "./theory/ReferenceValue";
import Scope from "./theory/Scope";
import SpreadRest from "./theory/SpreadRest";
import VarLetConst from "./theory/VarLetConst";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const syntaxProps = { CodeBlock, SyntaxHighlighter, docco };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main-content">
          <header>
            <h1>JavaScript Theory</h1>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<h2>Welcome to JavaScript Theory</h2>} />
              <Route
                path="/arrays-methods"
                element={<ArrayMethods {...syntaxProps} />}
              />
              <Route path="/closures" element={<Closures {...syntaxProps} />} />
              <Route path="/coercion" element={<Coercion {...syntaxProps} />} />
              <Route
                path="/data-types-dynamic-typing"
                element={<DataTypesDynamicTyping {...syntaxProps} />}
              />
              <Route
                path="/destructuring"
                element={<Destructuring {...syntaxProps} />}
              />
              <Route
                path="/default-values"
                element={<DefaultValues {...syntaxProps} />}
              />
              <Route path="/hoisting" element={<Hoisting {...syntaxProps} />} />
              <Route
                path="/json-object"
                element={<JsonObject {...syntaxProps} />}
              />
              <Route
                path="/lexical-execution"
                element={<LexicalExecution {...syntaxProps} />}
              />
              <Route
                path="/memoization"
                element={<Memoization {...syntaxProps} />}
              />
              <Route
                path="/null-and-undefined"
                element={<NullandUndefined {...syntaxProps} />}
              />
              <Route
                path="/objects-primitive"
                element={<ObjectsPrimitive {...syntaxProps} />}
              />
              <Route
                path="/precedence-associability"
                element={<PrecedenceAssociability {...syntaxProps} />}
              />
              <Route path="/promises" element={<Promises {...syntaxProps} />} />
              <Route path="/scope" element={<Scope {...syntaxProps} />} />
              <Route
                path="/reference-value"
                element={<ReferenceValue {...syntaxProps} />}
              />
              <Route
                path="/spread-rest"
                element={<SpreadRest {...syntaxProps} />}
              />
              <Route
                path="/var-let-const"
                element={<VarLetConst {...syntaxProps} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
