import React from 'react';

const Header = ({ timeLeft, formatTimeFn }) => {
  return (
    <header className="exam-header">
      <div className="header-left">
        <h1>Java Programming - Final Test</h1>
        <p>Assigned by: Mr. Alex Smith | Duration: 120 Minutes</p>
      </div>
      <div className="header-right">
        <div className="student-info">
          <img src="https://via.placeholder.com/48" alt="Avatar" className="avatar" />
          <span>Welcome, John Doe</span>
        </div>
        <div className="timer">
          Time Left: <span className="time-display">{formatTimeFn(timeLeft)}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;