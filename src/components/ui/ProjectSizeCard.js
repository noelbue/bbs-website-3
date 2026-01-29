import React from 'react'
import * as styles from './ProjectSizeCard.module.css'

const ProjectSizeCard = ({ title, description }) => {
  return (
    <div className={styles.projectCard}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default ProjectSizeCard
