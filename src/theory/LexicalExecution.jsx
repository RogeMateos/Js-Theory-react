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
    <div style={{ marginTop: '1rem' }}>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ width: '100%', height: '8rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
      />
      <button onClick={runCode} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
        Run {method}
      </button>
      {result && CodeBlock && (
        <div style={{ marginTop: '0.5rem' }}>
          <CodeBlock>{result}</CodeBlock>
        </div>
      )}
    </div>
  );
};

const LexicalExecution = ({ CodeBlock }) => {
  console.log("CodeBlock in LexicalExecution:", CodeBlock); // Debugging log
  const [activeTab, setActiveTab] = useState('lexical-environment');

  const externalLinks = [
    { url: "https://www.youtube.com/watch?v=3V5SzF3bBZQ", text: "YouTube: Execution Context Explained" },
    { url: "https://www.youtube.com/watch?v=oGaOaDWXAzk", text: "YouTube: How JavaScript Works" },
    { url: "https://chatgpt.com/c/c6cf08c7-cbb5-4a61-87c5-5a63a0c0e546", text: "Chat GPT: Lexical Environment and Scope" }
  ];

  const examples = [
    {
      name: 'Lexical Environment',
      description: 'The lexical environment is concerned with where the code is written. It dictates the scope and visibility of variables and functions based on their physical placement in the code.',
      code: `function outerFunction() {
    var outerVar = 'I am outside!';

    function innerFunction() {
        var innerVar = 'I am inside!';
        console.log(outerVar); // Accessing outerVar from inner function
    }

    innerFunction();
    console.log(innerVar); // This will cause an error: innerVar is not defined
}

outerFunction();`,
    },
    {
      name: 'Execution Context',
      description: 'The execution context is concerned with what code is currently being executed. Each time a function is called, a new execution context is created. It manages the code that is running, including which variables and functions are accessible at that time.',
      code: `var globalVar = 'I am global!';

function firstFunction() {
    var firstVar = 'I am in firstFunction!';

    function secondFunction() {
        var secondVar = 'I am in secondFunction!';
        console.log(globalVar); // Accessing globalVar
        console.log(firstVar);  // Accessing firstVar
        console.log(secondVar); // Accessing secondVar
    }

    secondFunction();
}

firstFunction();`,
    },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Lexical Environment & Execution Context</h2>

      <p style={{ marginBottom: '1rem' }}>
        Understanding the concepts of Lexical Environment and Execution Context is crucial for grasping how JavaScript manages scope and variable accessibility.
      </p>

      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        {examples.map(example => (
          <button
            key={example.name}
            onClick={() => setActiveTab(example.name.toLowerCase().replace(' ', '-'))}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: activeTab === example.name.toLowerCase().replace(' ', '-') ? '#4CAF50' : '#f0f0f0',
              color: activeTab === example.name.toLowerCase().replace(' ', '-') ? 'white' : 'black',
              border: 'none',
              borderRadius: '0.25rem',
              marginRight: '0.5rem',
              cursor: 'pointer',
            }}
          >
            {example.name}
          </button>
        ))}
      </div>
      {examples.map(example => (
        activeTab === example.name.toLowerCase().replace(' ', '-') && (
          <div key={example.name}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '0.5rem' }}>{example.name}</h3>
            <p style={{ marginBottom: '1rem' }}>{example.description}</p>
            {CodeBlock && <CodeBlock>{example.code}</CodeBlock>}
            <InteractiveExample initialCode={example.code} method={example.name} CodeBlock={CodeBlock} />
            <h4>Explanation:</h4>
            <ul>
              {example.name === 'Lexical Environment' ? (
                <>
                  <li>outerVar is defined in the lexical environment of outerFunction. It is accessible throughout outerFunction and any inner functions.</li>
                  <li>innerVar is defined in the lexical environment of innerFunction. It is only accessible within innerFunction.</li>
                  <li>The lexical environment determines the scope based on where variables and functions are physically written in the code. Here, innerVar is not accessible in outerFunction because it is lexically scoped within innerFunction.</li>
                </>
              ) : (
                <>
                  <li>When firstFunction is called, a new execution context is created for it. This context includes globalVar and firstVar.</li>
                  <li>When secondFunction is called, another execution context is created for it. This context includes globalVar, firstVar, and secondVar.</li>
                  <li>Each function call creates a new execution context, which contains all the variables and functions available at that time. These contexts stack up, and the currently active one is at the top.</li>
                </>
              )}
            </ul>
          </div>
        )
      ))}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '0.5rem' }}>Summary</h3>
        <h4>Lexical Environment:</h4>
        <ul>
          <li>Refers to the physical location of code.</li>
          <li>Determines variable/function scope based on where they are written.</li>
          <li>Static, does not change when code is executed.</li>
        </ul>
        <h4>Execution Context:</h4>
        <ul>
          <li>Refers to the currently executing code.</li>
          <li>Manages the scope and context of variables/functions while the code runs.</li>
          <li>Dynamic, changes with each function call or execution phase.</li>
        </ul>
      </div>
      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default LexicalExecution;