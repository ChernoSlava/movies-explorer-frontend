import React from 'react';

import { Button } from '../Button';

import './NavTab.css';

export function NavTab() {
  return (
    <article className="navtab">
      <Button title="О проекте" link="#about-project" />
      <Button title="Технологии" link="#techs" />
      <Button title="Студент" link="#I'm" />
    </article>
  );
}
