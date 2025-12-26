// Sample assessment data for the dashboard - grouped by subject
export const assessments = {
    upcoming: [
        {
            id: 1,
            title: "Data Structures - Mid Term",
            subject: "Data Structures",
            instructor: "Dr. Sarah Johnson",
            date: "Dec 28, 2024",
            time: "10:00 AM",
            duration: "90 mins",
            questions: 30,
            marks: 60
        },
        {
            id: 2,
            title: "Database Management Quiz 3",
            subject: "DBMS",
            instructor: "Prof. Michael Chen",
            date: "Dec 30, 2024",
            time: "2:00 PM",
            duration: "45 mins",
            questions: 20,
            marks: 40
        },
        {
            id: 3,
            title: "Operating Systems - Unit Test",
            subject: "Operating Systems",
            instructor: "Dr. Emily Brown",
            date: "Jan 02, 2025",
            time: "11:00 AM",
            duration: "60 mins",
            questions: 25,
            marks: 50
        },
        {
            id: 9,
            title: "Java OOP Concepts Quiz",
            subject: "Java",
            instructor: "Mr. Alex Smith",
            date: "Jan 05, 2025",
            time: "9:00 AM",
            duration: "45 mins",
            questions: 25,
            marks: 50
        },
        {
            id: 10,
            title: "DBMS - Normalization Test",
            subject: "DBMS",
            instructor: "Prof. Michael Chen",
            date: "Jan 08, 2025",
            time: "3:00 PM",
            duration: "60 mins",
            questions: 30,
            marks: 60
        },
        {
            id: 11,
            title: "Python Advanced Topics",
            subject: "Python",
            instructor: "Ms. Lisa Wang",
            date: "Jan 10, 2025",
            time: "10:00 AM",
            duration: "75 mins",
            questions: 35,
            marks: 70
        }
    ],
    live: [
        {
            id: 4,
            title: "Java Programming - Final Test",
            subject: "Java",
            instructor: "Mr. Alex Smith",
            endTime: "2:30 PM",
            duration: "120 mins",
            questions: 20,
            marks: 40,
            timeRemaining: "1h 45m"
        }
    ],
    completed: [
        {
            id: 5,
            title: "Python Basics Quiz",
            subject: "Python",
            instructor: "Ms. Lisa Wang",
            date: "Dec 15, 2024",
            score: 42,
            totalMarks: 50,
            percentage: 84,
            status: "passed"
        },
        {
            id: 6,
            title: "Computer Networks - Quiz 2",
            subject: "Networks",
            instructor: "Dr. James Wilson",
            date: "Dec 10, 2024",
            score: 35,
            totalMarks: 40,
            percentage: 87.5,
            status: "passed"
        },
        {
            id: 7,
            title: "Web Development Fundamentals",
            subject: "Web Dev",
            instructor: "Prof. Anna Lee",
            date: "Dec 05, 2024",
            score: 28,
            totalMarks: 50,
            percentage: 56,
            status: "passed"
        },
        {
            id: 8,
            title: "C++ Programming Basics",
            subject: "C++",
            instructor: "Mr. David Park",
            date: "Nov 28, 2024",
            score: 38,
            totalMarks: 40,
            percentage: 95,
            status: "passed"
        },
        {
            id: 12,
            title: "Java Collections Quiz",
            subject: "Java",
            instructor: "Mr. Alex Smith",
            date: "Dec 18, 2024",
            score: 45,
            totalMarks: 50,
            percentage: 90,
            status: "passed"
        },
        {
            id: 13,
            title: "Python Data Types Test",
            subject: "Python",
            instructor: "Ms. Lisa Wang",
            date: "Dec 12, 2024",
            score: 38,
            totalMarks: 40,
            percentage: 95,
            status: "passed"
        },
        {
            id: 14,
            title: "DBMS - SQL Basics",
            subject: "DBMS",
            instructor: "Prof. Michael Chen",
            date: "Dec 01, 2024",
            score: 42,
            totalMarks: 50,
            percentage: 84,
            status: "passed"
        }
    ]
};

// Helper function to group assessments by subject
export const groupBySubject = (assessmentList) => {
    return assessmentList.reduce((groups, assessment) => {
        const subject = assessment.subject;
        if (!groups[subject]) {
            groups[subject] = [];
        }
        groups[subject].push(assessment);
        return groups;
    }, {});
};
