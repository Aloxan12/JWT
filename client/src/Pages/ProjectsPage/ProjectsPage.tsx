import React from 'react';
import styles from './ProjectsPage.module.css';
import bridge from './utils/images/brige.png';
const projectsData = [
  { title: 'Бридж', link: 'https://aloxan12.github.io/bridge', photo: bridge },
  { title: 'Карточки покемонов' },
  { title: 'Демо магазин' },
  { title: 'Прогноз погоды' },
  { title: 'Поиск картинок' },
  { title: 'Социальная сеть' },
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
            <div className={styles.ProjectItemPhoto}>
              <img src={project.photo} alt={'Бридж'} loading="eager" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
