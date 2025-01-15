import React, { useState, useEffect } from 'react';

const ChatBotResponse = ({ responseString }) => {
  const [finalAnswer, setFinalAnswer] = useState('');
  const [index, setIndex] = useState(0);

  const parseData = (input) => {
    try {
      // Clean and parse the input string
      const cleanedString = input.replace(/^---\s*/, '').trim();
      const parsedData = JSON.parse(cleanedString);

      // Return only the final_answer
      return parsedData.final_answer || "No final answer available";
    } catch (e) {
      console.error('Error parsing JSON:', e.message);
      return "Error processing response data";
    }
  };

  useEffect(() => {
    const parsedAnswer = parseData(responseString);

    if (parsedAnswer) {
      // Start the streaming process
      const intervalId = setInterval(() => {
        if (index < parsedAnswer.length) {
          setFinalAnswer((prev) => prev + parsedAnswer[index]);
          setIndex((prev) => prev + 1);
        } else {
          clearInterval(intervalId); // Stop the interval when the full answer is displayed
        }
      }, 30); // Adjust the delay for smoother or faster streaming

      return () => clearInterval(intervalId); // Cleanup on unmount or response change
    }
  }, [responseString, index]); // Reset when response changes

  return (
    <div className="final-answer">
      <p>{finalAnswer}</p>
    </div>
  );
};

export default ChatBotResponse;
