import React from 'react';

const SubmitButton = ({ onClick, disabled }) => {
  return (
    <button 
      className="btn-submit"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? 'Submitted' : 'Submit Test'}
    </button>
  );
};

export default SubmitButton;