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

const Hoisting = ({ CodeBlock }) => {
  console.log("CodeBlock in Hoisting:", CodeBlock); // Debugging log
  const [activeTab, setActiveTab] = useState('hoisting-definition');

  const externalLinks = [
    { url: "https://www.programiz.com/javascript/hoisting", text: "Programiz: JavaScript Hoisting" },
    { url: "https://dev.to/lydiahallie/javascript-visualized-hoisting-478h", text: "JavaScript Visualized: Hoisting" }
  ];

  const examples = [
    {
      name: 'Hoisting Definition',
      description: 'Hoisting means that variable and function declarations are moved to the top of their execution context before the code is run.',
      code: `// This is just a placeholder. The actual definition doesn't have a code example.
console.log("Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution.");`,
    },
    {
      name: 'Variable Hoisting',
      description: 'For variables, only the declarations are hoisted, not the initializations.',
      code: `console.log(x); // undefined
var x = 5;
console.log(x); // 5`,
    },
    {
      name: 'Function Hoisting',
      description: 'For functions, both the function declaration and the function expression are hoisted.',
      code: `hello(); // "Hello, world!"

function hello() {
  console.log("Hello, world!");
}`,
    },
    {
      name: 'Hoisting Example 1',
      description: 'An example demonstrating hoisting behavior.',
      code: `console.log(greeting);
hello();
function hello(){
    console.log('hello');
};
var greeting = "Hi there";
console.log(greeting);

// Output:
// undefined
// hello
// Hi there`,
    },
    {
      name: 'Hoisting Example 2',
      description: 'Another example demonstrating hoisting behavior.',
      code: `function hello(){
  console.log('hello');
}
var greeting;
console.log(greeting);
hello();
greeting = "Hi there";
console.log(greeting);

// Output:
// undefined
// hello
// "Hi there"`,
    },
  ];

  return (
    <div className="topic hoisting">
      <h2>Hoisting</h2>

      <p className="topic-description">
        Hoisting means that variable and function declarations are moved to the top of their execution context before the code is run. 
        When the function executes, the compiler looks for variable declarations, and if the variable were declared, it would hoist it to the top. 
        JavaScript engine is making multiple passes through the code, and on the first pass it is storing our function declarations and variables in memory before it executes any code.
      </p>

      <div className="tab-buttons">
        {examples.map(example => (
          <button
            key={example.name}
            onClick={() => setActiveTab(example.name.toLowerCase().replace(' ', '-'))}
            className={`tab-button ${activeTab === example.name.toLowerCase().replace(' ', '-') ? 'active' : ''}`}
          >
            {example.name}
          </button>
        ))}
      </div>
      {examples.map(example => (
        activeTab === example.name.toLowerCase().replace(' ', '-') && (
          <div key={example.name} className="example">
            <h3>{example.name}</h3>
            <p>{example.description}</p>
            {CodeBlock && <CodeBlock>{example.code}</CodeBlock>}
            <InteractiveExample initialCode={example.code} method={example.name} CodeBlock={CodeBlock} />
          </div>
        )
      ))}
      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default Hoisting;