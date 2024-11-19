import React, { useState } from 'react';
import './styles.css';

interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswer: number;
  questionNumber: number;
}

interface QuizInputPopupProps {
  onSubmit: (quizData: QuizQuestion) => void;
  onClose: () => void;
  questionNumber: number;
}

const QuizInputPopup: React.FC<QuizInputPopupProps> = ({ onSubmit, onClose, questionNumber }) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      question,
      answers,
      correctAnswer,
      questionNumber
    });
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Question {questionNumber}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Question:</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          
          {answers.map((answer, index) => (
            <div
                className='answer-input'
            key={index}>
              <label>Answer {index + 1}:</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
                required
              />
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswer === index}
                onChange={() => setCorrectAnswer(index)}
              />
            </div>
          ))}
          
          <button type="submit">Add Quiz</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default QuizInputPopup;