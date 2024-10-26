import React from 'react';
import Course from './Course';
import { conflictingClasses } from "../utilities/conflicts"

export default function CourseList({ courses, selection, classes, toggleSelected }) {
    const filteredCourses = Object.values(courses).filter(course => course.term === selection);
    const conflicts = conflictingClasses(classes, filteredCourses);
    
    const conflictedCourseNumbers = new Set(conflicts.map(({attempted}) => attempted.number));
    return (
        <div className="cards-list">
        {
            
            filteredCourses.map(course => (
                <Course
                    key={course.number}
                    course={course} 
                    classes={classes} 
                    toggleSelected={toggleSelected} 
                    nonselectable={conflictedCourseNumbers.has(course.number)}/>
                ))
        }
        </div>
    )
}