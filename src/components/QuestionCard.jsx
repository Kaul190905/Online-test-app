import React from 'react';

const QuestionCard = ({ question }) => {
  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-no">Question {question.id} of 20</span>
        <span className="marks">Marks: {question.marks}</span>
      </div>
      <h2 className="question-text">{question.text}</h2>
    </div>
  );
};

export default QuestionCard;