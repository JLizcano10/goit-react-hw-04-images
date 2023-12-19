import React from 'react';
import PropTypes from 'prop-types';

import { ButtonContainer, ButtonLoad } from './Button.styled';

const Button = ({ text, onClick }) => {
  return (
    <ButtonContainer>
      <ButtonLoad onClick={onClick}>{text}</ButtonLoad>
    </ButtonContainer>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Button;
