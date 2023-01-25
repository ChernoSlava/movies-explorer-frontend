import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__border"></div>
      <nav className="footer__nav">
        <p className="footer__copy">&copy;{new Date().getFullYear()}</p>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a href="https://github.com/ChernoSlava" className="footer__link footer__last-link" target="_blank" rel="noreferrer">Github</a>
        </div>
      </nav>
    </footer>
  );
};
