import React from 'react';
import './App.css';
import PackagesForm from './components/PackagesForm.jsx'
import Statistics from './components/Statistics.jsx'

function App() {
   return (
    <div className="App">
      <header className="App-header">
      <PackagesForm />
      <Statistics />
      </header>
    </div>
  );
}

export default App;
