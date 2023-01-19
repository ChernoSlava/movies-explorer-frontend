import './Footer.css';

export function Footer() {
  return (
    <div className="Footer">
      <p className="Footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="Footer__border"></div>
      <nav className="Footer__nav">
        <p className="Footer__copy">&copy;{new Date().getFullYear()}</p>
        <div className="Footer__links">
          <a href="https://practicum.yandex.ru" className="Footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a href="https://github.com/ChernoSlava" className="Footer__link Footer__last-link" target="_blank" rel="noreferrer">Github</a>
        </div>
      </nav>
    </div>
  );
};
