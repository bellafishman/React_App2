// parse class.meets to specific days and times 
// format: starthour:startmin-endhour:endmin
const parseMeetingTime = (meetingTime) => {
    // no error if empty meeting time:
    if (!meetingTime) return null;
    // format: days starthour:minute-endhour:minute
    const [days, timeSpanning] = meetingTime.split(" ");
    const [startTime, endTime] = timeSpanning.split("-").map(time => {
        const [h, m] = time.split(":").map(Number);
        return h*60 + m;
    })
    
    return {
        days: days.split(""), //get each day from days
        startTime,
        endTime
    }
}

// run one for loop of each selected class and attempted class days
// retruns true if some days overlap
const dayOverlap = (selected_one, attempted) => {
    return selected_one.days.some(element => attempted.days.includes(element));
}

// if any day overlap detected:
// returns true if overlapping
const timeOverlap = (selected_one, attempted) => {
    return Math.max(selected_one.startTime, attempted.startTime) <= Math.min(selected_one.endTime, attempted.endTime);
}

// arguments:
// selected: null, single, or array, classes already selected in cart
// attempted: array of all classes in courselist for term given
export const conflictingClasses = (selected, attempted) => {
    const conflicts = [];

    // if no selected classes, no possible conflicts
    if (!selected) return conflicts;

    // selected -> array for single or many classes
    const selectedClasses = Array.isArray(selected) ? selected : [selected];

    selectedClasses.forEach(selectedClass => {
        attempted.forEach(attemptedClass => {
            // check that they are the same term
            if (selectedClass.term == attemptedClass.term)
            {
                // parse meeting time from each
                const selectedClassmeets = parseMeetingTime(selectedClass.meets);
                const attemptedClassmeets = parseMeetingTime(attemptedClass.meets);
                // Check for day overlap
                if (dayOverlap(selectedClassmeets, attemptedClassmeets)) {
                    // If days overlap, check for time overlap
                    if (timeOverlap(selectedClassmeets, attemptedClassmeets)) {
                        // If both days and time overlap, add to conflicts
                        conflicts.push({
                            selected: selectedClass,
                            attempted: attemptedClass
                        });
                    }
                }
            }
            
        });
    });

    return conflicts;
};