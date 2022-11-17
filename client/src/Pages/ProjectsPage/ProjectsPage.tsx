import React from 'react';
import styles from './ProjectsPage.module.css';
import bridge from './utils/images/brige.png';
import pokemons from './utils/images/pokemons.png';
import weather from './utils/images/weather.png';
import socialPh from './utils/images/socialPh.png';
import photoSearch from './utils/images/photo-search.png';
import demoShop from './utils/images/demo-shop.png';
import chat from './utils/images/chat.png';

const projectsData = [
  { title: 'Бридж', link: 'https://aloxan12.github.io/bridge', photo: bridge },
  {
    title: 'Карточки покемонов',
    photo: pokemons,
    link: 'https://aloxan12.github.io/pokeapi-test/',
  },
  { title: 'Демо магазин', link: 'https://aloxan12.github.io/ShopTest/', photo: demoShop },
  { title: 'Прогноз погоды', link: 'https://aloxan12.github.io/weather-test/', photo: weather },
  {
    title: 'Поиск картинок',
    link: 'https://aloxan12.github.io/Flickr/#/search',
    photo: photoSearch,
  },
  { title: 'Чат', link: 'https://aloxan12.github.io/socket-chat', photo: chat },
  {
    title: 'Социальная сеть',
    link: 'https://aloxan12.github.io/ReactSocialNetwork',
    photo: socialPh,
  },
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
              <img src={project.photo} alt={project.title} />
            </div>
            <div className={styles.GoToProject}>
              {project.link && (
                <a href={project.link} target={'_blank'}>
                  Смотреть
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
