import './Portfolio.css';

import errow from '../../../images/errow.svg';

export function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__container'>
        <li className='portfolio__list'>
          <a 
            href='https://github.com/ChernoSlava/how-to-learn' 
            className='portfolio__link' 
            target='_blank' 
            rel="noreferrer"
          >
            <p className='portfolio__text'>Статичный сайт</p>
            <img className='portfolio__ico' src={errow} alt='Стрелка ссылка' />
          </a>
        </li>
        <li className='portfolio__list'>
          <a 
            href='http://chernoslava.github.io/russian-travel/' 
            className='portfolio__link' 
            target='_blank' 
            rel="noreferrer"
          >
            <p className='portfolio__text'>Адаптивный сайт</p>
            <img className='portfolio__ico' src={errow} alt='Стрелка ссылка' />
          </a>
        </li>
        <li className='portfolio__list'>
          <a 
            href='https://github.com/ChernoSlava/react-mesto-api-full' 
            className='portfolio__link' 
            target='_blank' 
            rel="noreferrer"
          >
            <p className='portfolio__text'>Одностраничное приложение</p>
            <img className='portfolio__ico' src={errow} alt='Стрелка ссылка' />
          </a>
        </li>
      </ul>
    </section>
  );
};
