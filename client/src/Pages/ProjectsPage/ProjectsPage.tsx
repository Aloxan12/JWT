import React from 'react';
import styles from './ProjectsPage.module.css';
import bridge from './utils/images/brige.png';
const projectsData = [
  { title: 'Бридж', link: 'https://aloxan12.github.io/bridge', photo: bridge },
  { title: 'Карточки покемонов' },
  { title: 'Демо магазин' },
  { title: 'Прогноз погоды' },
  { title: 'Поиск картинок' },
  { title: 'Социальная сеть', link: 'https://aloxan12.github.io/ReactSocialNetwork' },
];

export const ProjectsPage = () => {
  return (
    <div className={styles.MyProjectPageWrap}>
      {projectsData.map((project, index) => {
        return (
          <div className={styles.ProjectItem} key={`project-item-${index}`}>
            <div className={styles.TitleBlock}>
              <span>
                Название: <b>{project.title}</b>
              </span>
            </div>
            <div className={styles.ProjectItemPhoto}>
              <img src={project.photo} alt={project.title} loading="eager" />
            </div>
            <div className={styles.GoToProject}>
              <a href={project.link} target={'_blank'}>
                Смотреть
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
