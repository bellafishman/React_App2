import React from 'react'

const CourseList = ({ course }) => (
    <table className="card m-1 p-2 w-100">
        <tbody>
            <tr className="card-title"><td>{course.term} CS {course.number}</td></tr>
            <tr className="description"><td>{course.title}</td></tr>
            <tr>
                <td><div className="line"></div></td>
            </tr>
            <tr><td>{course.meets}</td></tr>
        </tbody>
    </table>
);

export default CourseList