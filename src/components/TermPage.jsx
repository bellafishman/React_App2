import React, { useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';


const terms = ["Fall", "Winter", "Spring"];



export default function TermPage({ data }) {
  const [selection, setSelection] = useState(terms[0]); 
  //const filteredCourses = Object.keys(data.courses).filter(courseId => 
  //  data.courses[courseId].term === selection
  //);


  const [classes, setClasses] = useState([]);
  const toggleSelected = (item) => setClasses(
    classes.includes(item)
    ? classes.filter(x => x !== item)
    : [...classes, item]
  );

  

  return (
    <div>
      <TermSelector selection={selection} setSelection={setSelection} terms={terms} />
      <CourseList 
        courses={data.courses}
        selection={selection} // Pass the full course object
        classes={classes}
        toggleSelected={toggleSelected}
      />
    </div>
  );
}
