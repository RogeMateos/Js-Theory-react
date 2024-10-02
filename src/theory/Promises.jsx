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
        const consoleError = (...args) => { output.push('Error: ' + args.map(arg => JSON.stringify(arg)).join(' ')); };
        ${code.replace(/console\.log/g, 'consoleLog').replace(/console\.error/g, 'consoleError')}
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

const Promises = ({ CodeBlock }) => {
  const [activeTab, setActiveTab] = useState('creating-a-promise');
  
  const externalLinks = [
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise", text: "MDN: Promises" },
    { url: "https://javascript.info/promise-basics", text: "JavaScript.info: Promises" },
    { url: "https://www.youtube.com/watch?v=DHvZLI7Db8E", text: "YouTube: Promises Explained" }
  ];

  const examples = [
    {
      name: 'Creating a Promise',
      description: 'Here\'s how you can create a simple Promise:',
      code: `const myPromise = new Promise((resolve, reject) => {
  // Simulating an asynchronous operation
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Operation successful!");
    } else {
      reject("Operation failed.");
    }
  }, 1000);
});

myPromise
  .then(result => {
    console.log(result); // Output: Operation successful!
  })
  .catch(error => {
    console.error(error); // This will run if the promise is rejected
  });

console.log("This will be logged before the promise resolves.");`,
    },
    {
      name: 'Chaining Promises',
      description: 'Promises can be chained to handle multiple asynchronous operations sequentially:',
      code: `function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve({id: 1, name: 'John'}), 1000);
  });
}

function processData(data) {
  return new Promise(resolve => {
    setTimeout(() => resolve({...data, processed: true}), 1000);
  });
}

fetchData()
  .then(data => {
    console.log('Fetched data:', data);
    return processData(data);
  })
  .then(processedData => {
    console.log('Processed data:', processedData);
  })
  .catch(error => {
    console.error('Error:', error);
  });`,
    },
    {
      name: 'Promise.all()',
      description: 'Promise.all() allows you to handle multiple promises concurrently and wait for all of them to complete:',
      code: `const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve) => setTimeout(() => resolve(42), 100));
const promise3 = new Promise((resolve) => setTimeout(() => resolve('foo'), 200));

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // [3, 42, 'foo']
  })
  .catch(error => {
    console.error(error);
  });`,
    },
    {
      name: 'Async/Await',
      description: 'Async/await is syntactic sugar built on top of promises, making asynchronous code look and behave more like synchronous code:',
      code: `function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve({id: 1, name: 'John'}), 1000);
  });
}

async function getData() {
  try {
    console.log('Fetching data...');
    const data = await fetchData();
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getData();
console.log('This will be logged before getData completes.');`,
    },
  ];

  return (
    <div className="topic promises">
      <h2>Promises in JavaScript</h2>

      <p className="topic-description">
        A Promise in JavaScript represents an eventual completion (or failure) of an asynchronous operation and its resulting value. It allows you to handle asynchronous tasks in a more manageable way than callbacks.
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

      <div className="promise-states">
        <h3>States of a Promise:</h3>
        <ul>
          <li><b>Pending:</b> Initial state, neither fulfilled nor rejected.</li>
          <li><b>Fulfilled:</b> The operation completed successfully.</li>
          <li><b>Rejected:</b> The operation failed.</li>
        </ul>
      </div>

      <div className="promise-benefits">
        <h3>Benefits of Promises</h3>
        <ul>
          <li>Better handling of asynchronous operations compared to callbacks</li>
          <li>Chainable for sequential asynchronous operations</li>
          <li>Better error handling through <code>.catch()</code></li>
          <li>Ability to handle multiple asynchronous operations concurrently with <code>Promise.all()</code></li>
        </ul>
      </div>

      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default Promises;