// src/components/InputBox/InputBox.jsx
import  React,{ useState } from "react";
import styles from "./InputBox.module.css";
import PropTypes from 'prop-types'

const InputBox = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className={styles.inputBox}>
      <input
        type="text"
        className={styles.input}
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button className={styles.sendButton} onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default InputBox;

InputBox.propTypes = {
    onSend:PropTypes.func
}
