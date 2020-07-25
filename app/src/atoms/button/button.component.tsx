import React, { FC, ReactNode } from 'react';
import { ButtonWrapper, IconWrapper, ButtonText } from './button.styles';
import { TiPlus } from 'react-icons/ti';

type Props = {
  text: string;
  icon: string;
  onClick: () => void;
  className?: string;
};

export enum ButtonIcons {
  PLUS = 'plus',
}

const Button: FC<Props> = ({ text, icon, onClick, className }) => {
  const getIcon = (): ReactNode => {
    switch (icon) {
      case ButtonIcons.PLUS:
        return <TiPlus />;
      default:
        return null;
    }
  };

  return (
    <ButtonWrapper onClick={onClick} className={className}>
      <IconWrapper>{getIcon()}</IconWrapper>
      <ButtonText>{text}</ButtonText>
    </ButtonWrapper>
  );
};

export default Button;
