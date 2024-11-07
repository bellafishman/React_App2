import React from 'react';
import Course from './Course';
import { conflictingClasses } from "../utilities/conflicts"
import { Link } from 'react-router-dom';

export default function CourseList({ courses, selection, classes, toggleSelected }) {
    const filteredCourses = Object.entries(courses)
        .filter(([id, course]) => course.term === selection)
        .map(([id, course]) => ({ id,  ...course }));

    const conflicts = conflictingClasses(classes, filteredCourses);
    
    const conflictedCourseIds = new Set(conflicts.map(({attempted}) => attempted.id));
    return (
        <div className="cards-list">
        {   
            filteredCourses.map(course => (
                <div key={course.id} className="course-card">
                    <Course
                        key={course.id}
                        course={course} 
                        classes={classes} 
                        toggleSelected={toggleSelected} 
                        nonselectable={conflictedCourseIds.has(course.id) && !classes.some(c => c.id === course.id)}
                    />
                </div>
                ))
        }
        </div>
    )
}