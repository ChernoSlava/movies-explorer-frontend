import React from 'react';

import { NavTab } from '../NavTab';

import './Promo.css';

export function Promo() {
  return (
    <section className="promo">
      <div className="promo__screen">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <NavTab />
      </div>
    </section>
  );
}
