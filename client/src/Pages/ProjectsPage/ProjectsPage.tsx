import React from 'react';
import styles from './ProjectsPage.module.css';

const projectsData = [
  { title: 'Бридж', link: 'https://aloxan12.github.io/bridge' },
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
            <a href={project.link} target={'_blank'}>
              {project.title}
            </a>
          </div>
        );
      })}
    </div>
  );
};
