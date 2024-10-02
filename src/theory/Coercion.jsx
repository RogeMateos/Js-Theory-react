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

const Coercion = ({ CodeBlock }) => {
  console.log("CodeBlock in Coercion:", CodeBlock); // Debugging log
  const [activeTab, setActiveTab] = useState('existence-check');

  const externalLinks = [
    { url: "https://www.udemy.com/course/understand-javascript/learn/lecture/2237498#overview", text: "Udemy: Coercion Truthy and Falsy Values" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof", text: "MDN Web Docs: typeof Operator" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness", text: "MDN Web Docs: Equality Comparisons" },
    { url: "https://www.youtube.com/watch?v=boBnpK6WFOM", text: "YouTube: JavaScript Truthy and Falsy Explained" },
    { url: "https://dev.to/alldanielscoding/understanding-truthy-and-falsy-values-in-javascript-49b2", text: "Dev.to: Understanding Truthy and Falsy Values in JavaScript" }
  ];

  const examples = [
    {
      name: 'Existence Check',
      description: 'Simple existence check with falsy values',
      code: `var a;
if (a) {
    console.log('Something is there');
} else {
    console.log('Nothing is there');
}
// Output: "Nothing is there" because 'a' is undefined (a falsy value)`,
    },
    {
      name: 'Handling Zero',
      description: 'Handling 0 as a valid value',
      code: `var a = 0;
if (a || a === 0) {
    console.log('Something is there, including 0');
} else {
    console.log('Nothing is there');
}
// Output: "Something is there, including 0" because 'a' is 0, which is considered valid here.`,
    },
  ];

  return (
    <div className="topic coercion">
      <h2>Coercion Truthy and Falsy Values</h2>

      <p className="topic-description">
        In JavaScript, dynamic typing and type coercion allow for automatic conversion of values in certain contexts, such as in conditional statements. Understanding how the JavaScript engine treats <em>truthy</em> and <em>falsy</em> values can be used to simplify existence checks and write more efficient code. Key falsy values include <code>undefined</code>, <code>null</code>, <code>0</code>, <code>""</code> (empty string), and <code>false</code>.
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

export default Coercion;