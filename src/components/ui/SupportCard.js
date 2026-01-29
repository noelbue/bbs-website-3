import React from 'react'
import * as styles from './SupportCard.module.css'

const SupportCard = ({ icon, title, items }) => {
  return (
    <div className={styles.supportCard}>
      {icon && (
        <div className={styles.iconBox}>
          {icon}
        </div>
      )}
      <h3>{title}</h3>
      <ul className={styles.itemList}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default SupportCard
