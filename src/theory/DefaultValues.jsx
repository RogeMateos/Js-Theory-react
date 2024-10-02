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

const DefaultValues = ({ CodeBlock }) => {
  const externalLinks = [
    { url: "https://www.udemy.com/course/understand-javascript/learn/lecture/2237500#overview", text: "Udemy: Setting Default Values" },
    { url: "https://chatgpt.com/c/66f1f476-5e98-8008-9942-97930f6d6b30", text: "Chat GPT" },
    { url: "https://www.udemy.com/course/understand-javascript/learn/lecture/2237502#overview", text: "Udemy: Setting Default Values framework" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR", text: "MDN: Logical OR (||) Operator" },
    { url: "https://javascript.info/logical-operators#or", text: "JavaScript.info: Logical Operators" },
    { url: "https://www.youtube.com/watch?v=NIq3qLaHCIs", text: "YouTube: Understanding OR Operator in JavaScript" },
  ];

  const examples = [
    {
      name: 'Logical OR (`||`) for Default Values',
      description: `JavaScript allows you to provide default values for function parameters, even if they aren't provided. By using the logical OR (\`||\`) operator, we can assign a fallback value when the argument passed to the function is \`undefined\`, \`null\`, or another falsy value.`,
      code: `function greet(name) {
        name = name || 'Your name here';
        console.log('Hello ' + name);
      }

      greet('Tony'); // Output: Hello Tony
      greet();       // Output: Hello Your name here`,
    },
    {
      name: 'How the OR Operator Works',
      description: `The OR (\`||\`) operator in JavaScript is more than just a boolean operator. It evaluates the operands from left to right and returns the first operand that is "truthy". If none of the values are "truthy," it returns the last one.`,
      code: `// Example 1
console.log(true || false);  // Output: true

// Example 2
console.log(undefined || 'hello'); // Output: hello

// Example 3
console.log(0 || 'default');  // Output: default`,
    },
    {
      name: 'Default Value Assignment in Functions',
      description: `When a function parameter is \`undefined\`, we can use the OR operator to provide a default value. This technique is commonly used in JavaScript libraries and frameworks. In this scenario, if the \`name\` parameter is missing or falsy, it will fall back to the default string 'Your name here'.`,
      code: `function greet(name) {
        name = name || 'Your name here';
        console.log('Hello ' + name);
      }

      greet('Tony');       // Output: Hello Tony
      greet(undefined);    // Output: Hello Your name here`,
    },
    {
      name: 'Potential Pitfalls',
      description: `While this pattern is useful, there are some cases where it might not work as expected. For example, \`0\`, \`false\`, or an empty string \`''\` are all falsy values, so they will trigger the default value. To handle these cases more explicitly, you can use the nullish coalescing operator (\`??\`) introduced in ES2020, which only falls back when \`undefined\` or \`null\` is encountered.`,
      code: `function greet(name) {
        name = name ?? 'Your name here';
        console.log('Hello ' + name);
      }

      greet(0);  // Output: Hello 0`,
    },
  ];

  return (
    <div className="topic default-values">
      <h2>Setting Default Values in JavaScript</h2>

      <p className="topic-description">
        JavaScript allows you to provide default values for function parameters, even if they aren't provided. This can be done using the logical OR (`||`) operator to assign a fallback value when the argument passed to the function is `undefined`, `null`, or another falsy value.
      </p>

      {examples.map(example => (
        <div key={example.name} className="example">
          <h3>{example.name}</h3>
          <p>{example.description}</p>
          {CodeBlock && <CodeBlock>{example.code}</CodeBlock>}
          <InteractiveExample initialCode={example.code} method={example.name} CodeBlock={CodeBlock} />
        </div>
      ))}

      <ExternalLinks links={externalLinks} />
    </div>
  );
};

export default DefaultValues;