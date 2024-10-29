import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useFormData } from '../utilities/useFormData';

// contains text input fields for the title and meeting times
// for a course. Add a link or button on each course card to open the edit form
const validateUserData = (key, val) => {
    switch (key) {
        case 'title':
            return val.trim() === '' ? 'Title is required' : '';
        case 'meets':
            return val.trim() === '' ? 'Meeting time is required' : '';
        default:
            return '';
    }
}



const InputField = ({name, text, state, change}) => (
    <div>
        <label htmlFor={name} className="form-label">{text}</label>
        <input className="form-control" id={name} name={name}
            defaultValue={state.values?.[name]} onChange={change} />
        <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
)

const ButtonBar = ({message, disabled}) => {
    const navigate = useNavigate();
    return (
        <div className="d-flex">
            <button type="button" className="btn btn-outline-dark me-2" 
                onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary me-auto" 
                disabled={disabled}>Submit</button>
            <span className="p-2">{message}</span>
        </div>
    );
};

const CourseEditor = ({user}) => {
    const { courseId } = useParams();
    const [state, change] = useFormData(validateUserData, { title: '', meets: '' })
    
    const submit = (evt) => {
        evt.preventDefault();
        console.log("Form submission would go here:", state.values);
    };
    return (
        <form onSubmit={submit} noValidate>
            <InputField name="title" text="Title" state={state} change={change} />
            <InputField name="meets" text="Meeting Time" state={state} change={change} />
            <ButtonBar message="Fill out the form" disabled={!!state.errors?.title || !!state.errors?.meets} />
        </form>
    )
}

export default CourseEditor;
