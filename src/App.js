import React, { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    author: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = e => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    fetch('http://localhost:5000/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Stack Overflow Clone</h1>

      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={newQuestion.title} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={newQuestion.description} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Author:
          <input type="text" name="author" value={newQuestion.author} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Submit Question</button>
      </form>

      <div>
        <h2>Questions:</h2>
        <ul>
          {questions.map(question => (
            <li key={question._id}>
              <strong>{question.title}</strong>
              <p>{question.description}</p>
              <p>Author: {question.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
