import React from 'react';
import Course from './Course';

export default function CourseList({ courses, selection, classes, toggleSelected }) {
    const filteredCourses = Object.values(courses).filter(course => course.term === selection);
    return (
        <div className="cards-list">
        {
            
            filteredCourses.map(course => (
                <Course
                    key={course.number}
                    course={course} 
                    classes={classes} 
                    toggleSelected={toggleSelected} />
                ))
        }
        </div>
    )
}