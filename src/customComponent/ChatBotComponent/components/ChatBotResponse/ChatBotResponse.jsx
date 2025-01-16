import React, { useState, useEffect } from "react";
import styles from "./ChatBotResponse.module.css";
import { RiMenu2Fill } from "react-icons/ri";
import { MdHeadphones } from "react-icons/md";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

const ChatBotResponse = ({ responseString }) => {
  const [finalAnswer, setFinalAnswer] = useState("");
  const [index, setIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startSpeech = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(responseString);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;

      // Speech started
      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      // Speech ended
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  const pauseSpeech = () => {
    if ("speechSynthesis" in window && isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if ("speechSynthesis" in window && isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleIconClick = () => {
    if (isSpeaking) {
      if (isPaused) {
        resumeSpeech();
      } else {
        pauseSpeech();
      }
    } else {
      startSpeech();
    }
  };

  useEffect(() => {
    if (responseString) {
      const intervalId = setInterval(() => {
        if (index < responseString.length) {
          setFinalAnswer((prev) => prev + responseString[index]);
          setIndex((prev) => prev + 1);
        } else {
          clearInterval(intervalId);
        }
      }, 10);

      return () => clearInterval(intervalId);
    }
  }, [responseString, index]);

  return (
    <div className="final-answer">
      <div className={styles.header}>
        <div className={styles.answerSection}>
          <RiMenu2Fill size={18} />
          <span>Answer</span>
        </div>
        <div className={styles.actionSection}>
          {isSpeaking && !isPaused ? (
            <HiOutlineSpeakerWave
              className={styles.speakerIcon}
              size={20}
              onClick={handleIconClick}
            />
          ) : (
            <MdHeadphones
              className={styles.headphoneIcon}
              size={20}
              onClick={handleIconClick}
            />
          )}
        </div>
      </div>
      <p>{finalAnswer}</p>
    </div>
  );
};

export default ChatBotResponse;
