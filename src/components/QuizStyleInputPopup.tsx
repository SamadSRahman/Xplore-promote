import React, { useState } from 'react';
import './styles.css';

interface QuizQuestion {
    question: string;
    answers: string[];
    correctAnswers: number[];  // Changed to array for multiple selections
    questionNumber: number;
    styles: QuizStyles;
    multipleSelect: boolean;  // New field for multiple selection
}

interface QuizStyles {
    fontSize: string;
    fontFamily: string;
    fontColor: string;
    backgroundColor: string;
    buttonColor: string;
    selectedOptionColor: string;
    buttonTextColor: string;
}

interface QuizStyleInputPopupProps {
    onSubmit: (quizData: QuizQuestion) => void;
    onClose: () => void;
    questionNumber: number;
}


const QuizStyleInputPopup: React.FC<QuizStyleInputPopupProps> = ({ onSubmit, onClose, questionNumber }) => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);  // Changed to array
    const [multipleSelect, setMultipleSelect] = useState(false);
    const [styles, setStyles] = useState<QuizStyles>({
        fontSize: '16px',
        fontFamily: 'Arial',
        fontColor: '#000000',
        backgroundColor: '#ffffff',
        buttonColor: '#e0e0e0',
        selectedOptionColor: '#4CAF50',
        buttonTextColor: '#ffffff'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            question,
            answers,
            correctAnswers,
            questionNumber,
            styles,
            multipleSelect
        });
        onClose();
    };

    const handleCorrectAnswerChange = (index: number) => {
        if (multipleSelect) {
            setCorrectAnswers(prev =>
                prev.includes(index)
                    ? prev.filter(i => i !== index)
                    : [...prev, index]
            );
        } else {
            setCorrectAnswers([index]);
        }
    };
    //   const [showColorPicker, setShowColorPicker] = useState(false);
    //   const fontColorRef = useRef<HTMLInputElement>(null);
    //   const bgColorRef = useRef<HTMLInputElement>(null);
    //   const buttonColorRef = useRef<HTMLInputElement>(null);
    //   const selectedOptionColorRef = useRef<HTMLInputElement>(null);
    //   const buttonTextColorRef = useRef<HTMLInputElement>(null);

    //   const handleColorIconClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    //     inputRef.current?.click();
    //   };



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
                        {answers.map((answer, index) => (
                            <div className='answer-input' key={index}>
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
                                    type={multipleSelect ? "checkbox" : "radio"}
                                    name="correctAnswer"
                                    checked={correctAnswers.includes(index)}
                                    onChange={() => handleCorrectAnswerChange(index)}
                                />
                            </div>
                        ))}
                        <div>
                            <label className='multiple-select-container'>
                                <input
                                    type="checkbox"
                                    checked={multipleSelect}
                                    onChange={(e) => setMultipleSelect(e.target.checked)}
                                />
                                Allow multiple correct answers
                            </label>
                        </div>
                    </div>

                    <div className="style-inputs">
                        <h4>Styling Options</h4>
                        <div>
                            <label>Font Size:</label>
                            <input
                                type="text"
                                value={styles.fontSize}
                                onChange={(e) => setStyles({ ...styles, fontSize: e.target.value })}
                                placeholder="e.g., 16px"
                            />
                        </div>
                        <div>
                            <label>Font Family:</label>
                            <select
                                value={styles.fontFamily}
                                onChange={(e) => setStyles({ ...styles, fontFamily: e.target.value })}
                            >
                                <option value="Arial">Arial</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Verdana">Verdana</option>
                            </select>
                        </div>
                        <div>
                            <label>Font Color:</label>
                            <input
                                type="color"
                                value={styles.fontColor}
                                onChange={(e) => setStyles({ ...styles, fontColor: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Background Color:</label>
                            <input
                                type="color"
                                value={styles.backgroundColor}
                                onChange={(e) => setStyles({ ...styles, backgroundColor: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Button Color:</label>
                            <input
                                type="color"
                                value={styles.buttonColor}
                                onChange={(e) => setStyles({ ...styles, buttonColor: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Selected Option Color:</label>
                            <input
                                type="color"
                                value={styles.selectedOptionColor}
                                onChange={(e) => setStyles({ ...styles, selectedOptionColor: e.target.value })}
                            />
                        </div>
                        <button type="submit">Add Quiz</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>

                    {/* Multiple select option */}


                    {/* Modified answer inputs */}


                    {/* Existing buttons */}
             
                </form>
            </div>
        </div>
    );
};

export default QuizStyleInputPopup;