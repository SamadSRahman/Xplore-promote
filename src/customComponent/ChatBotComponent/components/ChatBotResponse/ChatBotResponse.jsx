import React from 'react';

const ChatBotResponse = ({ responseString }) => {
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

  const finalAnswer = parseData(responseString);

  return (
    <div className="final-answer">
      <p>{finalAnswer}</p>
    </div>
  );
};

export default ChatBotResponse;
