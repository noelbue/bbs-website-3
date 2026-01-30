import React from 'react'
import * as styles from './SocialLink.module.css'

const SocialLink = ({ icon, label, href, description }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
      <div className={styles.iconBox}>
        {icon}
      </div>
      <div className={styles.content}>
        <h3 className={styles.label}>{label}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </a>
  )
}

export default SocialLink
