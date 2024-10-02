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

const ReferenceValue = ({ CodeBlock }) => {
  const [activeTab, setActiveTab] = useState('primitive-types');

  const externalLinks = [
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values", text: "MDN: JavaScript Primitive Values" },
    { url: "https://www.javascripttutorial.net/javascript-pass-by-value-vs-pass-by-reference/", text: "JS Tutorial: Pass by Value vs Pass by Reference" },
    { url: "https://www.youtube.com/watch?v=9ooYYRLdg_g", text: "YouTube: Value vs Reference in JavaScript" }
  ];

  const examples = [
    {
      name: 'Primitive Types',
      description: 'Primitive types are passed by value. When you assign a primitive value to a variable, JavaScript copies the value itself.',
      code: `let a = 5;
let b = a; // b is a copy of the value in a
b = 10;
console.log(a); // Output: 5
console.log(b); // Output: 10`,
    },
    {
      name: 'Objects',
      description: 'Objects are passed by reference. When you assign an object to a variable, JavaScript copies the reference to the value.',
      code: `let obj1 = { name: 'Alice' };
let obj2 = obj1; // obj2 now holds a reference to the same object
obj2.name = 'Bob';
console.log(obj1.name); // Output: Bob
console.log(obj2.name); // Output: Bob`,
    },
    {
      name: 'Functions and References',
      description: "When passing objects to functions, you're passing a reference to the object.",
      code: `function changeName(obj) {
  obj.name = 'Charlie';
}

let person = { name: 'Alice' };
changeName(person);
console.log(person.name); // Output: Charlie`,
    },
    {
      name: 'Copying Objects',
      description: 'To create a true copy of an object, you can use methods like Object.assign() or the spread operator.',
      code: `let original = { a: 1, b: 2 };
let copy = Object.assign({}, original);
// or
let spreadCopy = {...original};

copy.a = 5;
console.log(original.a); // Output: 1
console.log(copy.a);     // Output: 5`,
    },
  ];

  return (
    <div className="topic reference-value">
      <h2>Reference and Value in JavaScript</h2>

      <p className="topic-description">
        In JavaScript, how variables behave when assigned or passed as arguments depends on their type. Primitive types are passed by value, while objects (including arrays and functions) are passed by reference.
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

      <div className="implications">
        <h3>Implications and Best Practices</h3>
        <ul>
          <li>Be aware of whether you're working with primitive values or objects.</li>
          <li>When you need to modify an object without affecting the original, create a copy first.</li>
          <li>Be cautious when passing objects to functions if you don't want the original object modified.</li>
          <li>Understand that const doesn't make an object immutable; it only prevents reassignment of the variable itself.</li>
        </ul>
      </div>

      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default ReferenceValue;