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

const Destructuring = ({ CodeBlock }) => {
  const [activeTab, setActiveTab] = useState('object-destructuring');

  const externalLinks = [
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment", text: "MDN: Destructuring assignment" },
    { url: "https://javascript.info/destructuring-assignment", text: "JavaScript.info: Destructuring assignment" },
  ];

  const examples = [
    {
      name: 'Object Destructuring',
      description: 'Object destructuring allows you to extract properties from objects and bind them to variables.',
      code: `const person = { name: 'Alice', age: 30, city: 'New York', job: 'Developer' };

// Basic destructuring
const { name, age } = person;
console.log(name, age);

// Destructuring with new variable names
const { name: fullName, job: occupation } = person;
console.log(fullName, occupation);

// Destructuring with default values
const { country = 'USA' } = person;
console.log(country);`,
    },
    {
      name: 'Array Destructuring',
      description: 'Array destructuring allows you to extract elements from arrays and assign them to variables.',
      code: `const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

// Basic array destructuring
const [firstColor, secondColor] = colors;
console.log(firstColor, secondColor);

// Skipping elements
const [, , thirdColor] = colors;
console.log(thirdColor);

// Rest pattern
const [primary, secondary, ...otherColors] = colors;
console.log(primary, secondary, otherColors);`,
    },
    {
      name: 'Advanced Use Cases',
      description: 'Nested destructuring and function parameter destructuring.',
      code: `// Nested Destructuring
const user = {
  id: 42,
  details: {
    name: 'Bob',
    age: 28
  }
};

const { id, details: { name, age } } = user;
console.log(id, name, age);

// Function Parameter Destructuring
function printPersonInfo({ name, age }) {
  console.log(\`\${name} is \${age} years old.\`);
}

printPersonInfo({ name: 'Alice', age: 30 });`,
    },
  ];

  return (
    <div className="topic destructuring">
      <h2>JavaScript Destructuring</h2>

      <p className="topic-description">
        Destructuring is a convenient way of extracting multiple values from data stored in objects and arrays. 
        It allows you to unpack values from arrays, or properties from objects, into distinct variables.
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

export default Destructuring;