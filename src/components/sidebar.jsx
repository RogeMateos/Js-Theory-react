import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const categories = {
    'Fundamentos': [
      { name: 'Data Types & Dynamic Typing', path: '/data-types-dynamic-typing' },
      { name: 'Hoisting', path: '/hoisting' },
      { name: 'Scope', path: '/scope' },
      { name: 'Var, Let, & Const', path: '/var-let-const' }
    ],
    'Funciones y Objetos': [
      { name: 'Closures', path: '/closures' },
      { name: 'Default Values', path: '/default-values' },
      { name: 'Object & Primitive', path: '/objects-primitive' },
      { name: 'Json & Object Literal', path: '/json-object' },
    ],
    'Arrays y Métodos': [
      { name: 'Array Methods', path: '/arrays-methods' },
      { name: 'Destructuring', path: '/destructuring' },
      { name: 'Spread & Rest', path: '/spread-rest' },
    ],
    'Avanzado': [
      { name: 'Coercion', path: '/coercion' },
      { name: 'Lexical Environment & Execution Context', path: '/lexical-execution' },
      { name: 'Memoization', path: '/memoization' },
      { name: 'Precedence', path: '/precedence-associability' },
      { name: 'Promises', path: '/promises' },
      { name: 'Reference vs Value', path: '/reference-value' },
    ],
    'Otros': [
      { name: 'Null and Undefined', path: '/null-and-undefined' },
    ],
  };

  return (
    <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <button onClick={toggleSidebar} className="sidebar-toggle">
        {isOpen ? '←' : '→'}
      </button>
      {isOpen && (
        <nav>
          {Object.entries(categories).map(([category, topics]) => (
            <div key={category} className="category">
              <button 
                onClick={() => toggleCategory(category)}
                className="category-button"
              >
                {expandedCategories[category] ? '▼' : '▶'}
                <span className='category-icon'>{category}</span>
              </button>
              {expandedCategories[category] && (
                <div className="category-content">
                  <ul>
                    {topics.map(topic => (
                      <li key={topic.name}>
                        <Link to={topic.path}>{topic.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Sidebar;