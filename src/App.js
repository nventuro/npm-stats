import React from 'react';
import './App.css';
import QueryForm from './QueryForm.jsx'
import StatsDisplay from './StatsDisplay.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <QueryForm />
      <StatsDisplay />
      </header>
    </div>
  );
}

export default App;
