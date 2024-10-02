import React, { useState } from 'react';

const ExternalLinks = ({ links }) => (
  <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '0.5rem' }}>
    <h4>External Resources:</h4>
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
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

const Closures = ({ CodeBlock }) => {
  console.log("CodeBlock in Closures:", CodeBlock); // Debugging log
  const [activeTab, setActiveTab] = useState('basic-closure');

  const externalLinks = [
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures", text: "MDN Web Docs: Closures" },
    { url: "https://www.youtube.com/watch?v=3a0I8ICR1Vg", text: "YouTube: Learn Closures In 7 Minutes" },
    { url: "https://dev.to/reubengt/a-simple-example-i-use-to-remember-what-a-closure-is-1ap2", text: "A Simple Example of Closures" },
    { url: "https://dev.to/shimphillip/javascript-closure-simply-explained-1f79", text: "JavaScript Closure Explained" },
    { url: "https://summarize.ing/video-39832-Learn-Closures-In-7-Minutes", text: "Summarize: Learn Closures" },
  ];

  const examples = [
    {
      name: 'Basic Closure',
      description: 'A simple example demonstrating a closure.',
      code: `function greet(name) {
  if (validateName()) { 
    console.log('Hola ' + name);
  }

  function validateName() {
    return (name.length > 1);
  }
}

greet(''); // No output, name is too short
greet('Miguel'); // Outputs: Hola Miguel

validateName('pepe'); // Error: validateName is not defined`,
    },
    {
      name: 'Basic Closure 2',
      description: 'An example where the inner function accesses a variable from the outer function.',
      code: `function outerFunction() {
  let outerVariable = 'I am outside!';

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}

const closure = outerFunction();
closure();  // Output: I am outside!`,
    },
  ];

  return (
    <div className="topic closures">
      <h2>Closures</h2>

      <p className="topic-description">
        A closure occurs when a function is defined inside another function, giving the inner function access to the outer function's variables and scope, even after the outer function has completed its execution. 
        This means that the inner function can still access and manipulate the variables of the outer function, even though those variables are not accessible from the global scope or any other context.
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


export default Closures;