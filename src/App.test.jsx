import {beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App';
import { filteredCourses } from './components/CourseList';
import {useAuthState} from './utilities/firebase';
import {useJsonQuery} from './utilities/fetch'

const mockSchedule = {
  "title": "CS Courses for 1850-1851",
  "courses": { 
    "F101": {
      "term": "Fall",
      "number": "101",
      "meets": "MWF 11:00-11:50",
      "title": "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F111": {
        "term": "Fall",
        "number": "111",
        "meets": "MWF 13:00-13:50",
        "title": "Fundamentals of Computer Programming I"
    },
    "F211": {
        "term": "Fall",
        "number": "211",
        "meets": "MWF 12:30-13:50",
        "title": "Fundamentals of Computer Programming II"
    },
    "W110": {
      "term": "Winter",
      "number": "110",
      "meets": "TuTh 16:00-17:20",
      "title": "Intro Programming for non-majors"
    },
    "S110": {
      "term": "Spring",
      "number": "110",
      "meets": "MWF 11:00-11:50",
      "title": "Intro Programming for non-majors"
    }
  }
};

vi.mock('./utilities/firebase');
vi.mock('./utilities/fetch');

beforeEach(() => {
    useJsonQuery.mockReturnValue([mockSchedule, null]);
    useAuthState.mockReturnValue([null]);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('launching', () => {
  it('should show the current year', () => {
    render(<App />);
    screen.getByText(/1850/);
  });
});

describe('term selection', () => {
  it('should show fall courses initially', () => {
    render(<App />);
    screen.getByText(/Fall CS 101/);
    expect(useJsonQuery).toHaveBeenCalledTimes(1);
  });
  
  it('should show winter courses when winter term selected', async () => {
    render(<App />);
    screen.getByText('Winter').click();
    await screen.findByText(/Winter CS 110/);
    expect(useJsonQuery).toHaveBeenCalledTimes(2);
  });
});


describe('course conflicts', () => {
  it('should allow same time, different terms', () => {
    expect(filteredCourses(mockSchedule.courses.F101, [mockSchedule.courses.S110])).toBeTruthy();
  });
  it('should reject MWF 13:00-13:50 and MWF 12:30-13:50', () => {
    expect(filteredCourses(mockSchedule.courses.F111, [mockSchedule.courses.F211])).toBeFalsy();
  })
});


