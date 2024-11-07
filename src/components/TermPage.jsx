import React, { useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';
import Modal from './Modal';
import Cart from './Cart';

const terms = ["Fall", "Winter", "Spring"];



export default function TermPage({ data }) {
  const [selection, setSelection] = useState(terms[0]); 
  // open or close modal
  const [open, setOpen] = useState(false);

  const [classes, setClasses] = useState([]);

  const toggleSelected = (item) => {
    setClasses(prevClasses => 
        prevClasses.some(course => course.id === item.id)
            ? prevClasses.filter(course => course.id !== item.id)  // Deselect if already selected
            : [...prevClasses, item]  // Select if not already selected
    );
};

  // modal functions for toggling modal
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  

  return (
    <div>
      <TermSelector selection={selection} setSelection={setSelection} terms={terms} />
      <button className="btn btn-outline-dark" onClick={openModal}>
        <i className="fa-solid fa-plus"></i>
      </button>
      <Modal open={open} close={closeModal}>
        <Cart classes={classes}  />
      </Modal>

      <CourseList 
        courses={data.courses} // Pass the full course object
        selection={selection} 
        classes={classes} 
        toggleSelected={toggleSelected}
      />
    </div>
  );
}
