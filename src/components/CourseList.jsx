import React from 'react'

const CourseList = ({ course }) => (
    <table>
        <tbody>
            <tr><th>Term</th><td>{course.term}</td></tr>
            <tr><th>Course Number</th><td>{course.number}</td></tr>
            <tr><th>Time</th><td>{course.meets}</td></tr>
            <tr><th>Title</th>
                <td>
                {course.title}
                </td>
            </tr>
        </tbody>
    </table>
);

export default CourseList