import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import OptionItem from './components/OptionItem';
import NavigationButtons from './components/NavigationButtons';
import QuestionPalette from './components/QuestionPalette';
import SummaryLegend from './components/SummaryLegend';
import SubmitButton from './components/SubmitButton';
import SubmissionModal from './components/SubmissionModal';
import useTestTimer from './hooks/useTestTimer';
import { questions } from './data/questions';
import { formatTime } from './utils/formatTime';
import './styles/global.css';

const EXPECTED_ROLL = "STU2025001";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [marked, setMarked] = useState(new Array(questions.length).fill(false));
  const [visited, setVisited] = useState(new Array(questions.length).fill(false));
  const { timeLeft } = useTestTimer(120 * 60); // 120 minutes
  const [showModal, setShowModal] = useState(false);
  const [rollInput, setRollInput] = useState('');
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Mark current question as visited when it changes
  useEffect(() => {
    const newVisited = [...visited];
    newVisited[currentQuestion] = true;
    setVisited(newVisited);
  }, [currentQuestion]);

  const handleAnswer = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleClear = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = null;
    setAnswers(newAnswers);
  };

  const handleMark = () => {
    const newMarked = [...marked];
    newMarked[currentQuestion] = !newMarked[currentQuestion];
    setMarked(newMarked);
  };

  const handleSubmit = () => {
    if (rollInput.trim() === EXPECTED_ROLL) {
      setShowModal(false);
      setRollInput('');
      const answeredCount = answers.filter(a => a !== null).length;
      alert(`Test Submitted Successfully!\nYou answered ${answeredCount} out of ${questions.length} questions.`);
      setSubmitted(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="exam-container">
      <Header timeLeft={timeLeft} formatTimeFn={formatTime} />

      <ProgressBar answers={answers} total={questions.length} />

      <div className="main-content">
        <section className="question-section">
          <QuestionCard question={questions[currentQuestion]} />

          <div className="options">
            {questions[currentQuestion].options.map((opt, i) => (
              <OptionItem
                key={i}
                index={i}
                text={opt}
                selected={answers[currentQuestion] === i}
                onSelect={handleAnswer}
              />
            ))}
          </div>

          <NavigationButtons
            current={currentQuestion}
            total={questions.length}
            onPrev={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            onNext={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            onClear={handleClear}
            onMark={handleMark}
            marked={marked[currentQuestion]}
          />
        </section>

        <aside className="sidebar">
          <h3>Question Palette</h3>
          <QuestionPalette
            total={questions.length}
            current={currentQuestion}
            answers={answers}
            marked={marked}
            visited={visited}
            onJump={setCurrentQuestion}
          />

          <SummaryLegend
            answers={answers}
            marked={marked}
            visited={visited}
            total={questions.length}
          />

          <SubmitButton
            onClick={() => setShowModal(true)}
            disabled={submitted}
            
          />
        </aside>
      </div>

      <SubmissionModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setRollInput('');
          setError(false);
        }}
        onSubmit={handleSubmit}
        rollInput={rollInput}
        setRollInput={setRollInput}
        error={error}
      />
    </div>
  );
}

export default App;