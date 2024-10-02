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

const DataTypes = ({ CodeBlock }) => {
  console.log("CodeBlock in DataTypes:", CodeBlock); // Debugging log
  const [activeTab, setActiveTab] = useState('data-types');

  const externalLinks = [
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures", text: "MDN: Data Structures" },
    { url: "https://www.javascripttutorial.net/javascript-data-types/", text: "JavaScript Data Types" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/typeof", text: "MDN: typeof Operator" }
  ];

  const examples = [
    {
      name: 'Data Types',
      description: 'JjjjjavaScript has several data types, categorized into primitive and reference types.',
      code: `let str = 'Hello'; // Primitive type
let num = 42;     // Primitive type
let arr = [1, 2, 3]; // Reference type
let obj = { name: 'Alice' }; // Reference type

console.log(typeof str);
console.log(typeof num);
console.log(typeof arr);
console.log(typeof obj);`,
    },
    {
      name: 'Dynamic Typing',
      description: 'JavaScript is a dynamically typed language, meaning that variables can hold values of any type and that type can change during runtime.',
      code: `let dynamicVar = 'This is a string';
console.log(typeof dynamicVar);

dynamicVar = 100;
console.log(typeof dynamicVar);

dynamicVar = true;
console.log(typeof dynamicVar);`,
    },
    {
      name: 'Type Checking',
      description: 'You can use the typeof operator to check the type of a variable.',
      code: `console.log(typeof "Hello");
console.log(typeof 42);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof {});
console.log(typeof []);
console.log(typeof function(){});`,
    },
  ];

  return (
    <div className="topic data-types">
      <h2>Data Types and Dynamic Typing</h2>

      <p className="topic-description">
        JavaScript is a dynamically typed language with several data types. Understanding these types and how dynamic typing works is crucial for effective JavaScript programming.
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

export default DataTypes;