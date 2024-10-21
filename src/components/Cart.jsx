import React from 'react'

export default function Cart({ classes = [] }) {
  return (
    <div className="cart">
    {
      classes.length === 0
      ? <h3>The cart is empty. Click on classes to add to cart.</h3>
      : classes.map(course => (
          <div key={course.number}>
            <h4>{course.term} CS {course.number} -- {course.title}</h4>
            <p>{course.meets}</p>
          </div>
        ))
    }
  </div>
  )
}

