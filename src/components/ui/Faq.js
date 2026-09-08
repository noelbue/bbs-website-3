import React from "react";
import { useId, useState } from "react";
import * as styles from "./FAQ.module.css";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const answerId = `${id}-answer`;

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}>
      <h3 className={styles.faqHeading}>
        <button
          className={styles.faqQuestion}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={answerId}
        >
          <span>{question}</span>
          <svg
            className={styles.icon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>
      {/* Immer im DOM, damit aria-controls auf ein vorhandenes Element zeigt */}
      <div className={styles.faqAnswer} id={answerId} hidden={!isOpen}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = ({ items }) => {
  return (
    <div className={styles.faqContainer}>
      {items.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQ;
