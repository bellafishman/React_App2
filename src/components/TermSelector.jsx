import React from 'react';


const TermButton = ({ term, selection, setSelection }) => (
  <div>
    <input
      type="radio"
      id={term}
      className="btn-check"
      checked={term === selection}
      autoComplete="off"
      onChange={() => setSelection(term)}
    />
    <label className="btn btn-success mb-1 p-2 term-btn" htmlFor={term}>
      {term}
    </label>
  </div>
);

const TermSelector = ({ selection, setSelection, terms }) => (
  <div className="btn-group term-buttons-row">
    { 
      terms.map((term) => (
        <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />
      ))
    }
  </div>
);

export default TermSelector;
