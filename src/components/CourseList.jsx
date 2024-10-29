import React from 'react';
import Course from './Course';
import { conflictingClasses } from "../utilities/conflicts"
import { Link } from 'react-router-dom';

export default function CourseList({ courses, selection, classes, toggleSelected }) {
    const filteredCourses = Object.values(courses).filter(course => course.term === selection);
    const conflicts = conflictingClasses(classes, filteredCourses);
    
    const conflictedCourseNumbers = new Set(conflicts.map(({attempted}) => attempted.number));
    return (
        <div className="cards-list">
        {   
            filteredCourses.map(course => (
                <div key={course.number} className="course-card">
                    <Course
                        key={course.number}
                        course={course} 
                        classes={classes} 
                        toggleSelected={toggleSelected} 
                        nonselectable={conflictedCourseNumbers.has(course.number) && !classes.includes(course)}
                    />
                </div>
                ))
        }
        </div>
    )
}