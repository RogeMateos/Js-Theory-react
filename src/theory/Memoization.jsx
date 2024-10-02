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

const Memoization = ({ CodeBlock }) => {
  console.log("CodeBlock in Memoization:", CodeBlock); // Debugging log
  const [activeTab, setActiveTab] = useState('what-is-memoization');

  const externalLinks = [
    { url: "https://www.youtube.com/watch?v=mKNtUsGrV0w", text: "YouTube: Memoization Explained" },
    { url: "https://developer.mozilla.org/en-US/docs/Glossary/Memoization", text: "MDN: Memoization" },
    { url: "https://www.freecodecamp.org/news/understanding-memoization-in-javascript-51d07d19430e/", text: "FreeCodeCamp: Understanding Memoization" },
    { url: "https://www.youtube.com/watch?v=N0fr5UU0kU8", text: "YouTube: Memoization Explained (Codevolution)" },
    { url: "https://www.geeksforgeeks.org/javascript-memoization/", text: "GeeksforGeeks: JavaScript Memoization" }
  ];

  const examples = [
    {
      name: 'What is Memoization',
      description: 'Memoization is an optimization technique used in programming to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.',
      code: `// This is just a placeholder. Memoization is a concept, not a specific code snippet.
console.log("Memoization is an optimization technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again.");`,
    },
    {
      name: 'Basic Memoization Example',
      description: 'Here\'s a simple example of a memoized function that calculates the factorial of a number:',
      code: `function memoizedFactorial() {
  const cache = {};
  
  return function factorial(n) {
    if (n in cache) {
      console.log('Fetching from cache');
      return cache[n];
    } else {
      console.log('Calculating result');
      if (n === 0 || n === 1) {
        return 1;
      } else {
        const result = n * factorial(n - 1);
        cache[n] = result;
        return result;
      }
    }
  }
}

const factorial = memoizedFactorial();

console.log(factorial(5)); // Output: 120 (calculated)
console.log(factorial(5)); // Output: 120 (fetched from cache)
console.log(factorial(6)); // Output: 720 (calculated using cached values)`,
    },
  ];

  return (
    <div className="topic memoization">
      <h2>Memoization</h2>

      <p className="topic-description">
        Memoization is an optimization technique used in programming to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again. In JavaScript, memoization is particularly useful for optimizing recursive functions or any computationally expensive functions that are called frequently with the same inputs.
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
      <div className="section">
        <h3>Benefits of Memoization</h3>
        <ul>
          <li>Improves performance for expensive function calls</li>
          <li>Reduces redundant calculations</li>
          <li>Speeds up recursive algorithms</li>
          <li>Can significantly reduce execution time in certain scenarios</li>
        </ul>
      </div>
      <div className="section">
        <h3>When to Use Memoization</h3>
        <p>Memoization is most effective when:</p>
        <ul>
          <li>The function is pure (always returns the same output for the same input)</li>
          <li>The function is computationally expensive</li>
          <li>The function is called repeatedly with the same inputs</li>
          <li>The range of possible inputs is limited</li>
        </ul>
      </div>
      <div className="section">
        <h3>Considerations</h3>
        <p>While memoization can greatly improve performance, it's important to consider:</p>
        <ul>
          <li>Memory usage: Caching results requires additional memory</li>
          <li>Cache invalidation: Ensuring cached results remain valid if underlying data changes</li>
          <li>Complexity: Memoization adds complexity to your code</li>
        </ul>
      </div>
      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default Memoization;