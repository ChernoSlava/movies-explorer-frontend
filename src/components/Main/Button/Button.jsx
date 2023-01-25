import React from 'react';

import './Button.css';

export const Button = ({ title, link }) => (
    <button className='button'>
        <a href={link} className="button__text">
            {title}
        </a>
    </button>
);
