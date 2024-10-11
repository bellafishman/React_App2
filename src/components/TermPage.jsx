import React, { useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';


const terms = ["Fall", "Winter", "Spring"];



export default function TermPage({ data }) {
  const [selection, setSelection] = useState(terms[0]); 

  const filteredCourses = Object.keys(data.courses).filter(courseId => 
    data.courses[courseId].term === selection
  );

  return (
    <div>
      <TermSelector selection={selection} setSelection={setSelection} terms={terms} />
      <div className="cards-list">
        {filteredCourses.map(courseId => {
          const course = data.courses[courseId];
          return (
            <CourseList 
              key={courseId} 
              course={course} // Pass the full course object
            />
          );
        })}
        </div>
    </div>
  );
}
