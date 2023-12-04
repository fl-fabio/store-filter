import React from 'react';
import './App.scss';
import Header from './pages/Header/Header';
import Router from './router/Router';

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}

export default App;
