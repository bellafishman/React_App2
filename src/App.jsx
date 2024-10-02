import { useState } from 'react';
import './App.css';

const schedule = {
  title: "CS Courses for 2018-2019"
};

const App = () => {
  
  return (
    <div className="App">
      <h1>
        {schedule}
      </h1>
    </div>
  );
};

export default App;
