import React from 'react';

import './AboutProject.css';

export function AboutProject() {
  return (
    <section className="aboutp" id="about-project">
      <h2 className="aboutp__title">О проекте</h2>
      <div className="aboutp__columns">
        <div className="aboutp__column">
          <h3 className="aboutp__column-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutp__column-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональностиь, финальные доработки и ещё много умных слов.
          </p>
        </div>
        <div className="aboutp__column">
          <h3 className="aboutp__column-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutp__column-subtitle">
            У каждого этапа был мягонький и очень жёсткий дедлайн, которые нужно
            было соблюдать, чтобы выжить.
          </p>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-bar__scales">
          <div className="progress-bar__scale progress-bar__scale_green">
            1 неделя
          </div>
          <div className="progress-bar__scale progress-bar__scale_grey">
            4 недели
          </div>
        </div>
        <div className="progress-bar__descriptions">
          <p className="progress-bar__description">Back-end</p>
          <p className="progress-bar__description">Front-end</p>
        </div>
      </div>
    </section>
  );
}
