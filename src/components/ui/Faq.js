import React, { useState } from 'react'
import * as styles from './FAQ.module.css'

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.faqQuestion}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg 
          className={styles.icon}
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
      {isOpen && (
        <div className={styles.faqAnswer}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

const FAQ = ({ items }) => {
  return (
    <div className={styles.faqContainer}>
      {items.map((item, index) => (
        <FAQItem 
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  )
}

export default FAQ
