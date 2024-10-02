import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const schedule = {
    title: "CS Courses for 2018-2019"
  };
  return (
    <div className="App">
      <h1>
        {schedule}
      </h1>
    </div>
  );
};

export default App;
