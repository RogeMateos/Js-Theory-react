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

const Scope = ({ CodeBlock }) => {
  const [activeTab, setActiveTab] = useState('global-scope');

  const externalLinks = [
    { url: "https://developer.mozilla.org/en-US/docs/Glossary/Scope", text: "MDN Web Docs: Scope" },
    { url: "https://www.w3schools.com/js/js_scope.asp", text: "W3Schools: JavaScript Scope" },
    { url: "https://javascript.info/closure", text: "JavaScript.info: Variable scope, closure" }
  ];

  const examples = [
    {
      name: 'Global Scope',
      description: 'Variables declared outside of any function or block have global scope. They can be accessed from anywhere in the JavaScript program.',
      code: `var globalVar = "I'm global";

function someFunction() {
    console.log(globalVar); // Accessible
}

someFunction();
console.log(globalVar); // Also accessible`,
    },
    {
      name: 'Function Scope',
      description: 'Variables declared inside a function have function scope. They can only be accessed within that function.',
      code: `function someFunction() {
    var localVar = "I'm local";
    console.log(localVar); // Accessible
}

someFunction();
// Uncomment the next line to see the error:
// console.log(localVar); // Error: localVar is not defined`,
    },
    {
      name: 'Block Scope',
      description: 'Variables declared inside a block using let or const have block scope. They can only be accessed within that block.',
      code: `if (true) {
    let blockVar = "I'm block-scoped";
    const alsoBlockScoped = "Me too";
    console.log(blockVar); // Accessible
    console.log(alsoBlockScoped); // Accessible
}

// Uncomment the next lines to see the errors:
// console.log(blockVar); // Error: blockVar is not defined
// console.log(alsoBlockScoped); // Error: alsoBlockScoped is not defined`,
    },
    {
      name: 'var vs let and const',
      description: 'The var keyword creates function-scoped or globally-scoped variables, while let and const create block-scoped variables.',
      code: `function varExample() {
    if (true) {
        var x = 1; // Function scoped
    }
    console.log(x); // 1
}

function letExample() {
    if (true) {
        let y = 1; // Block scoped
    }
    // Uncomment the next line to see the error:
    // console.log(y); // Error: y is not defined
}

varExample();
letExample();`,
    },
    {
      name: 'Lexical Scope',
      description: 'JavaScript uses lexical scoping, which means that functions are executed using the variable scope that was in effect when they were defined.',
      code: `function outerFunction() {
    let outerVar = "I'm from outer";

    function innerFunction() {
        console.log(outerVar); // Can access outerVar
    }

    innerFunction();
}

outerFunction();`,
    },
  ];

  return (
    <div className="topic scope">
      <h2>Scope in JavaScript</h2>

      <p className="topic-description">
        Scope in JavaScript refers to the current context of code, which determines the accessibility of variables to JavaScript. There are three main types of scope: Global Scope, Function Scope, and Block Scope (introduced with ES6).
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
          <li>Minimize use of global variables to avoid naming conflicts and to make your code more modular.</li>
          <li>Use <code>let</code> and <code>const</code> instead of <code>var</code> for more predictable scoping.</li>
          <li>Declare variables at the top of their scope for better readability.</li>
          <li>Use block scoping to your advantage to create more contained and maintainable code.</li>
        </ul>
      </div>

      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default Scope;