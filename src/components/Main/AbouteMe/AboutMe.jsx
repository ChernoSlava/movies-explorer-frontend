import './AboutMe.css';

export function AboutMe() {
  return (
    <section className="about-me" id="I'm">
      <h2 className='about-me__title'>Технологии</h2>
      <div className='about-me__container'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Вячеслав</h3>
          <p className='about-me__profession'>Фронтенд-разработчик, 27 лет</p>
          <p className='about-me__description'>
            Родился в Саратове, закончил факультет концертно камерного исполнения в МГИК. 
            Год назад начал учиться на web разработке на курсе Yandex.practikum и понял, что это как раз то, что мне нужно. 
            Сейчас живу в маленько городе Турции, продолжаю учиться и дополнительно занимаюсь с ментором.
          </p>
          <a href="https://github.com/ChernoSlava" className='about-me__link'>Github</a>
        </div>
        <div className='about-me__image-container'>
          <div className='about-me__image'></div>
        </div>
      </div>
    </section>
  );
};
