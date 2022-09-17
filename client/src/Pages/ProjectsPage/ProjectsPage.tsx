import React from 'react';
import styles from './ProjectsPage.module.css';

const projectsData = [
  { title: 'Бридж' },
  { title: 'Карточки покемонов' },
  { title: 'Демо магазин' },
  {},
];

export const ProjectsPage = () => {
  return (
    <div className={styles.MyProjectPageWrap}>
      {projectsData.map((project, index) => {
        return (
          <div className={styles.ProjectItem} key={`project-item-${index}`}>
            {project.title}
          </div>
        );
      })}
    </div>
  );
};
