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

const SpreadRest = ({ CodeBlock }) => {
  const [activeTab, setActiveTab] = useState('spread-arrays');

  const externalLinks = [
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax", text: "MDN: Spread Operator" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters", text: "MDN: Rest Parameters" },
    { url: "https://javascript.info/rest-parameters-spread", text: "JavaScript.info: Rest and Spread" },
    { url: "https://www.youtube.com/watch?v=iLx4ma8ZqvQ", text: "YouTube: Rest & Spread Operators Explained" }
  ];

  const examples = [
    {
      name: 'Spread Arrays',
      description: 'The spread operator allows an array to be expanded in places where zero or more elements are expected.',
      code: `const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combinedArray = [...arr1, ...arr2]; 
console.log(combinedArray);

// Copying an array
const originalArray = [1, 2, 3];
const copyArray = [...originalArray];
console.log(copyArray);`,
    },
    {
      name: 'Spread Objects',
      description: 'The spread operator can be used to merge objects.',
      code: `const person = { name: 'Alice', age: 25 };
const additionalInfo = { country: 'UK', job: 'Developer' };

const mergedPerson = { ...person, ...additionalInfo };
console.log(mergedPerson);`,
    },
    {
      name: 'Spread in Function Calls',
      description: 'Spread can be used to pass array elements as separate arguments to a function.',
      code: `function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum(...numbers));`,
    },
    {
      name: 'Rest in Functions',
      description: 'The rest operator allows a function to accept an indefinite number of arguments as an array.',
      code: `function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3, 4));
console.log(sum(1, 2, 3, 4, 5));`,
    },
    {
      name: 'Rest in Destructuring',
      description: 'Rest can be used in array and object destructuring to capture remaining elements or properties.',
      code: `// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);
console.log(second);
console.log(rest);

// Object destructuring
const person = { name: 'Alice', age: 25, country: 'UK', job: 'Developer' };
const { name, age, ...restOfInfo } = person;
console.log(name);
console.log(age);
console.log(restOfInfo);`,
    },
  ];

  return (
    <div className="topic spread-rest">
      <h2>Spread and Rest Operators in JavaScript</h2>

      <p className="topic-description">
        The spread (...) operator allows an iterable to be expanded, while the rest operator allows a function to accept an indefinite number of arguments as an array.
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

      <div className="key-differences">
        <h3>Key Differences</h3>
        <ul>
          <li><strong>Spread:</strong> Expands an array or object into individual elements.</li>
          <li><strong>Rest:</strong> Collects multiple elements and condenses them into a single array.</li>
          <li>Spread is used in function calls, array literals, and object literals.</li>
          <li>Rest is used in function parameters and destructuring assignments.</li>
        </ul>
      </div>

      <div className="use-cases">
        <h3>Use Cases</h3>
        <ul>
          <li>Use spread to combine arrays or objects.</li>
          <li>Use spread to pass array elements as separate arguments to a function.</li>
          <li>Use rest to create functions that can accept any number of arguments.</li>
          <li>Use rest in destructuring to capture remaining elements or properties.</li>
        </ul>
      </div>

      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default SpreadRest;