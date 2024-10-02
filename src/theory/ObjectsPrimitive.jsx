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

const ObjectsPrimitives = ({ CodeBlock }) => {
  const [activeTab, setActiveTab] = useState('objects');

  const externalLinks = [
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures", text: "MDN: JavaScript data types and data structures" },
    { url: "https://javascript.info/object", text: "JavaScript.info: Objects" },
    { url: "https://www.w3schools.com/js/js_object_definition.asp", text: "W3Schools: JavaScript Objects" }
  ];

  const examples = [
    {
      name: 'Objects',
      description: 'Objects in JavaScript are complex data types that allow you to store collections of data and more complex entities.Objects can contain properties and methods.',
      code: `let person = {
  name: "Alice",
  age: 30,
  greet: function() {
    console.log("Hello, I'm " + this.name);
  }
};

person.greet(); // Output: Hello, I'm Alice
console.log(person.name); // Output: Alice
console.log(person.age);  // Output: 30`,
    },
    {
      name: 'Primitives',
      description: 'Primitive values are the simplest data types in JavaScript. They include String, Number, Boolean, Undefined, Null, Symbol, and BigInt.',
      code: `let str = "Hello";
let num = 42;
let bool = true;
let undef = undefined;
let n = null;
let sym = Symbol("unique");
let bigInt = 1234567890123456789012345678901234567890n;

console.log(typeof str);    // Output: string
console.log(typeof num);    // Output: number
console.log(typeof bool);   // Output: boolean
console.log(typeof undef);  // Output: undefined
console.log(typeof n);      // Output: object (this is a known quirk)
console.log(typeof sym);    // Output: symbol
console.log(typeof bigInt); // Output: bigint`,
    },
    {
      name: 'Differences',
      description: 'Main differences between objects and primitives include complexity, mutability, storage and copying, comparison, and methods.',
      code: `// Primitives
let a = 5;
let b = a;
b = 10;
console.log(a); // 5
console.log(b); // 10

// Objects
let obj1 = {x: 5};
let obj2 = obj1;
obj2.x = 10;
console.log(obj1.x); // 10
console.log(obj2.x); // 10

// Comparison
console.log(5 === 5);                  // true
console.log({x: 5} === {x: 5});        // false
console.log(obj1 === obj2);            // true`,
    },
    {
      name: 'Wrapping Primitives',
      description: 'JavaScript automatically wraps primitive values in objects when you try to access methods on them.',
      code: `let str = "hello";
console.log(str.toUpperCase()); // "HELLO"

let num = 42;
console.log(num.toFixed(2));   // "42.00"

let bool = true;
console.log(bool.toString());  // "true"`,
    },
  ];

  return (
    <div className="topic objects-primitives">
      <h2>Objects and Primitive Values in JavaScript</h2>

      <p className="topic-description">
        JavaScript has two main categories of data types: Objects and Primitive values. Understanding their differences is crucial for effective JavaScript programming.
      </p>

      <div className="tab-buttons">
        {examples.map(example => (
          <button
            key={example.name}
            onClick={() => setActiveTab(example.name.toLowerCase())}
            className={`tab-button ${activeTab === example.name.toLowerCase() ? 'active' : ''}`}
          >
            {example.name}
          </button>
        ))}
      </div>
      {examples.map(example => (
        activeTab === example.name.toLowerCase() && (
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

export default ObjectsPrimitives;