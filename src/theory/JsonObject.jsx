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

const JsonAndObjectLiteral = ({ CodeBlock }) => {
  console.log("CodeBlock in JsonAndObjectLiteral:", CodeBlock); // Debugging log
  const [activeTab, setActiveTab] = useState('object-literal');

  const externalLinks = [
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer", text: "MDN: Object initializer" },
    { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON", text: "MDN: JSON" },
    { url: "https://www.json.org/json-en.html", text: "JSON.org: Introducing JSON" },
  ];

  const examples = [
    {
      name: 'Object Literal',
      description: 'An object literal is a way to define objects in JavaScript. It allows for a more flexible and expressive way to create objects with properties and methods.',
      code: `// Object Literal
const person = {
  name: "John",
  age: 30,
  city: "New York",
  greet: function() {
    console.log(\`Hello, my name is \${this.name}\`);
  }
};

console.log(person);
person.greet();

// Adding a new property
person.job = "Developer";
console.log(person);

// Object literal with computed property names
const propertyName = "favoriteColor";
const anotherPerson = {
  [propertyName]: "blue"
};
console.log(anotherPerson);`,
    },
    {
      name: 'JSON',
      description: 'JSON (JavaScript Object Notation) is a lightweight data interchange format. It\'s easy for humans to read and write and easy for machines to parse and generate.',
      code: `// JSON string
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';

// Parsing JSON
const parsedObject = JSON.parse(jsonString);
console.log(parsedObject);

// Modifying the parsed object
parsedObject.job = "Developer";

// Converting back to JSON
const backToJson = JSON.stringify(parsedObject, null, 2);
console.log(backToJson);

// Attempting to parse invalid JSON (will throw an error)
try {
  JSON.parse('{"name": "John", age: 30}');
} catch (error) {
  console.log("Error parsing JSON:", error.message);
}`,
    },
    {
      name: 'Key Differences',
      description: 'Understanding the key differences between object literals and JSON is crucial for working with data in JavaScript.',
      code: `// Object Literal
const objectLiteral = {
  name: 'John',
  age: 30,
  greet() { console.log('Hello!'); }
};

// JSON
const jsonString = '{"name": "John", "age": 30}';

console.log("Object Literal:", objectLiteral);
console.log("JSON String:", jsonString);

// Demonstrating differences
console.log("Can include methods:", typeof objectLiteral.greet === 'function');
console.log("JSON after parsing:", JSON.parse(jsonString));

// Trying to stringify an object with a method
console.log("Stringifying object with method:", 
  JSON.stringify(objectLiteral));

// Property quotes are optional in object literals
const noQuotes = { name: "John" };
const withQuotes = { "name": "John" };
console.log("No quotes:", noQuotes);
console.log("With quotes:", withQuotes);`,
    },
  ];

  return (
    <div className="topic json-and-object-literal">
      <h2>JSON vs Object Literal</h2>

      <p className="topic-description">
        Object literals and JSON are both ways to represent structured data in JavaScript, but they have different purposes and characteristics. 
        Object literals are used for creating objects in JavaScript code, while JSON is a data interchange format used for storing and transmitting data.
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

export default JsonAndObjectLiteral;