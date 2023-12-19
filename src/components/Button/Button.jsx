import React from 'react';

import { ButtonContainer, ButtonLoad } from './Button.styled';

const Button = ({ text, type, onClick }) => {
  return (
    <ButtonContainer>
      <ButtonLoad type={type} onClick={onClick}>
        {text}
      </ButtonLoad>
    </ButtonContainer>
  );
};

export default Button;
