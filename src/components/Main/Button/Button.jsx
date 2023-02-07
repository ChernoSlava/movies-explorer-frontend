import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export function Button({ title, link }) {
  return (
    <button type="button" className="button">
      <a href={link} className="button__text">
        {title}
      </a>
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
