import {
  FooterStyled, 
  FooterTitle, 
  FooterBorder,
  FooterNav, 
  FooterCopy, 
  FooterLinks,
  FooterLink
} from './styled';

export function Footer() {
  return (
    <FooterStyled>
      <FooterTitle>Учебный проект Яндекс.Практикум х BeatFilm.</FooterTitle>
      <FooterBorder></FooterBorder>
      <FooterNav>
        <FooterCopy>&copy;{new Date().getFullYear()}</FooterCopy>
        <FooterLinks>
          <FooterLink 
            href="https://practicum.yandex.ru" 
            target="_blank" 
            rel="noreferrer">
              Яндекс.Практикум
          </FooterLink>
          <FooterLink 
            href="https://github.com/ChernoSlava" 
            target="_blank" 
            rel="noreferrer" 
            last={true}>
              Github
          </FooterLink>
        </FooterLinks>
      </FooterNav>
    </FooterStyled>
  );
};
