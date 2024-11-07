import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../utilities/useFormData';
import { useDbUpdate, useDbData } from '../utilities/firebase';

// contains text input fields for the title and meeting times
// for a course. Add a link or button on each course card to open the edit form
const validateCourseData = (key, val) => {
    switch (key) {
        // at least 2 characters
        case 'title':
            return val.trim().length >= 2 ? '' : 'Title must be at least 2 characters';
        // empty string or legal meeting time (1+days and non emoty time span)
        case 'meets':
            const meetsPattern = /^$|^(?:[MTuWThF]+ \d{1,2}:\d{2}-\d{1,2}:\d{2})$/;
            return meetsPattern.test(val.trim()) ? '' : 'Must contain days and start-end time, e.g., MWF 12:00-13:20';
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

const CourseEditor = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [courseData, error] = useDbData(`/courses/${courseId}`);

    const [update, result] = useDbUpdate(`/courses/${courseId}`);
    const [state, change] = useFormData(validateCourseData, course);
    
    useEffect(() => {
        if (courseData) {
            setCourse(courseData);
        }
    }, [courseData]);

    const submit = (evt) => {
        evt.preventDefault();
        if (!state.errors) {
            update(state.values);
        }
    };
    return (
        <form onSubmit={submit} noValidate>
            <InputField name="title" text="Title" state={state} change={change} />
            <InputField name="meets" text="Meeting Time" state={state} change={change} />
            <ButtonBar message={result?.message} />
        </form>
    )
}

export default CourseEditor;
