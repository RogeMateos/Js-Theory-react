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

const NullAndUndefined = ({ CodeBlock }) => {
  const [activeTab, setActiveTab] = useState('understanding');

  const externalLinks = [
    { url: "https://code-boxx.com/javascript-null-vs-undefined-vs-empty/", text: "Code Boxx: JavaScript Null vs Undefined vs Empty" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null", text: "MDN: null" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined", text: "MDN: undefined" }
  ];

  const examples = [
    {
      name: 'Understanding',
      description: 'Understanding null and undefined in JavaScript',
      code: `let myVariable = null; // Intentionally empty
let myOtherVariable;   // Declared but not assigned, so it's undefined

console.log(myVariable);       // Output: null
console.log(myOtherVariable);  // Output: undefined`,
    },
    {
      name: 'Type Checking',
      description: 'Type checking for null and undefined',
      code: `console.log(typeof null);       // Output: "object" (this is a known quirk in JavaScript)
console.log(typeof undefined);  // Output: "undefined"`,
    },
    {
      name: 'Equality Comparison',
      description: 'Equality comparison between null and undefined',
      code: `console.log(null == undefined);   // Output: true (due to loose equality)
console.log(null === undefined);  // Output: false (due to strict equality)`,
    },
    {
      name: 'Checking for null or undefined',
      description: 'Different ways to check for null or undefined',
      code: `let variable = null;

// Using strict equality
if (variable === null || variable === undefined) {
    console.log('The variable is null or undefined');
}

// Using loose equality (not recommended, but commonly used)
if (variable == null) {
    console.log('The variable is null or undefined');
}

// Using the typeof operator
if (typeof variable === 'undefined') {
    console.log('The variable is undefined');
}

// Checking for null
if (variable === null) {
    console.log('The variable is null');
}`,
    },
  ];

  return (
    <div className="topic null-and-undefined">
      <h2>Null and Undefined in JavaScript</h2>

      <p className="topic-description">
        In JavaScript, <code>null</code> and <code>undefined</code> are both used to represent the absence of a value, but they have distinct meanings and use cases.
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

      <div className="best-practices">
        <h3>Best Practices</h3>
        <ul>
          <li>Use <code>===</code> for Comparisons: It's best practice to use strict equality to avoid issues with type coercion.</li>
          <li>Use <code>undefined</code> for uninitialized variables.</li>
          <li>Use <code>null</code> to intentionally signify "no value."</li>
          <li>Prefer <code>===</code> over <code>==</code> to avoid unintended type coercion.</li>
        </ul>
      </div>

      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default NullAndUndefined;