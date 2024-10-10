import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div>
      <Banner title={data.title} />
      <div className="cards-list">
        {Object.keys(data.courses).map(courseId => (
          <CourseList 
            coursekey={courseId} 
            course={data.courses[courseId]} 
          />
        ))}
      </div>
    </div>
  );
}

const queryClient = new QueryClient();


const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Main />
      </div>
    </QueryClientProvider>
  );
};

export default App;
