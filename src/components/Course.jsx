import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../utilities/firebase';

export default function Course({ course, classes, toggleSelected, nonselectable, profile }) {
    const [user] = useAuthState();
    const { id, number, title, term, meets } = course;
    const isSelected = classes.some(selectedCourse => selectedCourse.id === id);

    return (
        <table 
            className={`card m-1 p-2 w-100 ${nonselectable ? 'nonselectable' : ''}  ${isSelected ? 'selected' : ''}`} // Add nonselectable class if true
            onClick={() => !nonselectable && toggleSelected(course)} // Prevent selection if nonselectable
        >
            <tbody>
                <tr className="card-title"><td>{term} CS {number}</td></tr>
                <tr className="description"><td>{title}</td></tr>
                <tr>
                    <td><div className="line"></div></td>
                </tr>
                <tr><td>{meets}</td></tr>
                <tr><td>
                    {profile?.isAdmin && (
                        <Link to={`/course/${id}`} className="btn btn-outline-primary">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                    )}
                    
                </td></tr>
            </tbody>
        </table>
  )
}
