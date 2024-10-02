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

const PrecedenceAssociativity = ({ CodeBlock }) => {
  const [activeTab, setActiveTab] = useState('operator-precedence');

  const externalLinks = [
    { url: "https://www.udemy.com/course/understand-javascript/learn/lecture/2237488#questions/1642638", text: "Video: Operator Precedence and Associativity" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence", text: "MDN: Operator Precedence" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators", text: "MDN: JavaScript Operators" }
  ];

  const examples = [
    {
      name: 'Operator Precedence',
      description: 'Precedence defines the order in which operations are performed in an expression. Operators with higher precedence are evaluated before those with lower precedence.',
      code: `let result = 3 + 4 * 5;
console.log(result); // Output: 23

result = (3 + 4) * 5;
console.log(result); // Output: 35`,
    },
    {
      name: 'Operator Associativity',
      description: 'Associativity defines the direction in which operators of the same precedence level are evaluated. It can be either left-to-right (left associativity) or right-to-left (right associativity).',
      code: `let a, b, c;
a = 2;
b = 3;
c = 4;

a = b = c;
console.log(a); // Output: 4
console.log(b); // Output: 4
console.log(c); // Output: 4`,
    },
    {
      name: 'Complex Expression',
      description: 'An example of a complex expression demonstrating multiple operators and their precedence.',
      code: `let x = 5, y = 10, z = 15;
let result = x + y * z / 2 - 3;
console.log(result); // Output: 77

// Equivalent to:
result = x + ((y * z) / 2) - 3;
console.log(result); // Output: 77

// Using parentheses to change the order:
result = (x + y) * z / (2 - 3);
console.log(result); // Output: -150`,
    },
  ];

  return (
    <div className="topic precedence-associativity">
      <h2>Understanding Operator Precedence and Associativity in JavaScript</h2>

      <p className="topic-description">
        Operator precedence and associativity are crucial concepts in JavaScript that determine the order in which operations are performed in complex expressions.
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
          <li>Use parentheses to make your code more readable and to explicitly define the order of operations.</li>
          <li>Don't rely on implicit precedence for complex expressions. It's better to be explicit.</li>
          <li>When in doubt, consult the precedence table or use parentheses.</li>
        </ul>
      </div>

      <div className="common-precedence">
        <h3>Common Precedence Cases</h3>
        <p>Here are some common operators and their precedence order (from highest to lowest):</p>
        <ol>
          <li>Grouping ( )</li>
          <li>Member Access . []</li>
          <li>Function Call ( )</li>
          <li>Negation/Increment !x ++x --x</li>
          <li>Multiplication/Division * /</li>
          <li>Addition/Subtraction + -</li>
          <li>Comparison &lt; &lt;= &gt; &gt;=</li>
          <li>Equality == != === !==</li>
          <li>Logical AND &amp;&amp;</li>
          <li>Logical OR ||</li>
          <li>Assignment = += -= *= /=</li>
        </ol>
      </div>

      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default PrecedenceAssociativity;