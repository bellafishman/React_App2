import React from 'react'

export default function Course({ course, classes, toggleSelected, nonselectable }) {
    const { number, title, term, meets } = course;
    return (
        <table 
            className={`card m-1 p-2 w-100 ${nonselectable ? 'nonselectable' : ''}`} // Add nonselectable class if true
            onClick={() => !nonselectable && toggleSelected(course)} // Prevent selection if nonselectable
        >
            <tbody className={`${classes.includes(course) ? 'selected' : ''}`}>
                    <tr className="card-title"><td>{term} CS {number}</td></tr>
                    <tr className="description"><td>{title}</td></tr>
                    <tr>
                        <td><div className="line"></div></td>
                    </tr>
                    <tr><td>{meets}</td></tr>
            </tbody>
        </table>
  )
}
