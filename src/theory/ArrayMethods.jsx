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

const ArrayMethods = ({ CodeBlock }) => {
  const [activeTab, setActiveTab] = useState('every');

  const externalLinks = [
    { url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', text: 'MDN: Array Methods' },
    { url: 'https://www.youtube.com/watch?v=R8rmfD9Y5-c', text: 'Video: All Array Methods' },
  ];

  const methods = [
    {
      name: 'Every',
      description: 'Tests whether all elements in the array pass the test implemented by the provided function.',
      code: `const numbers = [1, 2, 3, 4, 5];
const allPositive = numbers.every(num => num > 0);
console.log(allPositive);`,
    },
    {
      name: 'Filter',
      description: 'The filter method takes an array and removes items that do not meet a specified criterion, likely resulting in an array with a length shorter than the original.',
      code: `
const overThirties = people.filter(function(person) {
  return person.age >= 30;
});

console.log(overThirties);

const items = [
  { name: 'Bike', price: 500 },
  { name: 'TV', price: 800 },
  { name: 'Laptop', price: 1200 },
  { name: 'Phone', price: 700 },
  { name: 'Headphones', price: 150 }
];
const affordableItems = items.filter(item => item.price <= 100);

console.log(affordableItems);

const affordableItems = items.filter(function(item) {
  return item.price <= 100;
});

console.log(affordableItems);

const affordableItems = items.filter(item => {
  return item.price <= 100;
});

console.log(affordableItems);
`,
    },
    {
      name: 'Find',
      description: 'Returns the value of the first element in the array that satisfies the provided testing function.',
      code: `const numbers = [1, 2, 3, 4, 5];
const found = numbers.find(num => num > 3);
console.log(found);`,
    },
    {
      name: 'Reduce',
      description: 'The reduce method is used to reduce an array to a single value, which is typically not an array but could be a number, string, or any other data type. Executes a reducer function on each element of the array, resulting in a single output value.',
      code: `const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum);`,
    },
    {
      name: 'Some',
      description: 'Tests whether at least one element in the array passes the test implemented by the provided function.',
      code: `const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven);`,
    },
  ];

  return (
    <div className="topic array-methods">
      <h2>Array Methods</h2>
      <div className="tab-buttons">
        {methods.map(method => (
          <button
            key={method.name}
            onClick={() => setActiveTab(method.name.toLowerCase())}
            className={`tab-button ${activeTab === method.name.toLowerCase() ? 'active' : ''}`}
          >
            {method.name}
          </button>
        ))}
      </div>
      {methods.map(method => (
        activeTab === method.name.toLowerCase() && (
          <div key={method.name} className="example">
            <h3>{method.name}</h3>
            <p>{method.description}</p>
            {CodeBlock && <CodeBlock>{method.code}</CodeBlock>}
            <InteractiveExample initialCode={method.code} method={method.name} CodeBlock={CodeBlock} />
          </div>
        )
      ))}
      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default ArrayMethods;