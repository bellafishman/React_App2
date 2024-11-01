import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import './App.css';
import Banner from './components/Banner';
import Navigation from './components/Navigation';
import TermPage from './components/TermPage';
import CourseEditor from './components/CourseEditor';
import { useDbData } from './utilities/firebase';

const Main = () => {
  const [data, error] = useDbData('/');

  if (error) return <h1>Error loading data: {`${error}`}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div>
      <Navigation />
      <Banner title={data.title} />
      <TermPage data={data}/>
    </div>
  );
}

const queryClient = new QueryClient();


const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="container">
          <Routes>
            {/* Route for the main page */}
            <Route path="/" element={<Main />} />

            {/* Route for the CourseEditor with dynamic courseId */}
            <Route path="/course/:courseId" element={<CourseEditor />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
