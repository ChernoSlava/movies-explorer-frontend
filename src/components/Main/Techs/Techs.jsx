import './Techs.css';

export function Techs() {
  return (
    <section className="techs" id='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <div className='techs__column'>
        <h3 className='techs__column-title'>7 технологий</h3>
        <p className='techs__column-subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className='techs__container'>
        <li className='techs__element'>
          <p className='techs__element-text'>HTML</p>
        </li>
        <li className='techs__element'>
          <p className='techs__element-text'>CSS</p>
        </li>
        <li className='techs__element'>
          <p className='techs__element-text'>JS</p>
        </li>
        <li className='techs__element'>
          <p className='techs__element-text'>REACT</p>
        </li>
        <li className='techs__element'>
          <p className='techs__element-text'>Git</p>
        </li>
        <li className='techs__element'>
          <p className='techs__element-text'>Express.js</p>
        </li>
        <li className='techs__element'>
          <p className='techs__element-text'>mongoDB</p>
        </li>
      </ul>
    </section>
  );
};
