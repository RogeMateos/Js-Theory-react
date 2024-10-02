import React, { useState } from 'react';

const ExternalLinks = ({ links }) => (
  <div className="external-links">
    <h4>External Resources:</h4>
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const InteractiveExample = ({ initialCode, method, CodeBlock }) => {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState('');

  const runCode = () => {
    try {
      const wrappedCode = `
        let output = [];
        const consoleLog = (...args) => { output.push(args.map(arg => JSON.stringify(arg)).join(' ')); };
        ${code.replace(/console\.log/g, 'consoleLog')}
        return output.join('\\n');
      `;
      const executionFunction = new Function(wrappedCode);
      const output = executionFunction();
      
      setResult(output);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="interactive-example">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="code-input"
      />
      <button onClick={runCode} className="run-button">
        Run {method}
      </button>
      {result && CodeBlock && (
        <div className="result">
          <CodeBlock>{result}</CodeBlock>
        </div>
      )}
    </div>
  );
};

const VarLetConst = ({ CodeBlock }) => {
  const [activeTab, setActiveTab] = useState('var');

  const externalLinks = [
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let", text: "MDN: let" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const", text: "MDN: const" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var", text: "MDN: var" },
    { url: "https://www.youtube.com/watch?v=sjyJBL5fkp8", text: "YouTube: Var, Let, and Const - What's the Difference?" }
  ];

  const examples = [
    {
      name: 'var',
      description: 'var is function-scoped and allows redeclaration within the same scope. If you declare a variable using var within a function, it is accessible anywhere within that function. var does not have block-level scope.',
      code: `var x = 10;
if (true) {
    var x = 20; // Same variable!
    console.log(x); // Output: 20
}
console.log(x); // Output: 20

// Function scope example
function exampleFunction() {
    var functionVar = 'I am function-scoped';
    if (true) {
        var blockVar = 'I am function-scoped (not block-scoped)';
    }
    console.log(functionVar); // Accessible
    console.log(blockVar);    // Accessible
}
exampleFunction();
// console.log(functionVar); // This would cause a ReferenceError`,
    },
    {
      name: 'let',
      description: 'let is block-scoped and does not allow redeclaration within the same scope.This means that once you declare a variable with let in a block, it cannot be redeclared or accessed outside that block.',
      code: `let y = 10;
if (true) {
    let y = 20; // Different variable
    console.log(y); // Output: 20
}
console.log(y); // Output: 10

// Block scope example
function exampleFunction() {
    let functionLet = 'I am function-scoped';
    if (true) {
        let blockLet = 'I am block-scoped';
        console.log(blockLet); // Accessible
    }
    console.log(functionLet); // Accessible
    // console.log(blockLet);    // This would cause a ReferenceError
}
exampleFunction();`,
    },
    {
      name: 'const',
      description: 'const is block-scoped and used to declare constants.Once a value is assigned to a const variable, it cannot be reassigned. However, if the variable holds an object or array, the properties or elements of that object or array can be modified.',
      code: `const z = 10;
// z = 20; // This would throw an error

const obj = { name: 'Alice' };
obj.name = 'Bob'; // This is allowed
console.log(obj);

// const obj = { name: 'Charlie' }; // This would throw an error

// Block scope example
function exampleFunction() {
    const functionConst = 'I am function-scoped';
    if (true) {
        const blockConst = 'I am block-scoped';
        console.log(blockConst); // Accessible
    }
    console.log(functionConst); // Accessible
    // console.log(blockConst);    // This would cause a ReferenceError
}
exampleFunction();`,
    },
    {
      name: 'Scope Comparison',
      description: 'Comparing the scoping behavior of var, let, and const.',
      code: `// Global scope
var globalVar = 'I am global';
let globalLet = 'I am also global';

function exampleFunction() {
    // Function scope
    var functionVar = 'I am function-scoped';
    let functionLet = 'I am also function-scoped';
    
    if (true) {
        // Block scope
        var blockVar = 'I am function-scoped (not block-scoped)';
        let blockLet = 'I am block-scoped';
        const blockConst = 'I am also block-scoped';
        
        console.log(blockVar);
        console.log(blockLet);
        console.log(blockConst);
    }
    
    console.log(blockVar); // Accessible
    // console.log(blockLet); // This would cause a ReferenceError
    // console.log(blockConst); // This would cause a ReferenceError
}

exampleFunction();

console.log(globalVar);
console.log(globalLet);
// console.log(functionVar); // This would cause a ReferenceError
// console.log(functionLet); // This would cause a ReferenceError`,
    },
  ];

  return (
    <div className="topic var-let-const">
      <h2>Var, Let, and Const in JavaScript</h2>

      <p className="topic-description">
        JavaScript provides three keywords for declaring variables: var, let, and const. Each has its own scoping rules and behaviors.
      </p>

      <div className="tab-buttons">
        {examples.map(example => (
          <button
            key={example.name}
            onClick={() => setActiveTab(example.name.toLowerCase().replace(/ /g, '-'))}
            className={`tab-button ${activeTab === example.name.toLowerCase().replace(/ /g, '-') ? 'active' : ''}`}
          >
            {example.name}
          </button>
        ))}
      </div>
      {examples.map(example => (
        activeTab === example.name.toLowerCase().replace(/ /g, '-') && (
          <div key={example.name} className="example">
            <h3>{example.name}</h3>
            <p>{example.description}</p>
            {CodeBlock && <CodeBlock>{example.code}</CodeBlock>}
            <InteractiveExample initialCode={example.code} method={example.name} CodeBlock={CodeBlock} />
          </div>
        )
      ))}

      <div className="best-practices">
        <h3>Best Practices</h3>
        <ul>
          <li>Use <code>const</code> by default.</li>
          <li>Use <code>let</code> only when you know the variable will be reassigned.</li>
          <li>Avoid using <code>var</code> in modern JavaScript code.</li>
          <li>Be mindful of the temporal dead zone when using <code>let</code> and <code>const</code>.</li>
          <li>Use block-scoping to your advantage to create more contained and maintainable code.</li>
        </ul>
      </div>

      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default VarLetConst;