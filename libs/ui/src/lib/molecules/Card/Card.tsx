import React from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent,
  CardActions,
} from '@mui/material';

export interface CardProps extends MuiCardProps {
  rootContent?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  rootContent,
  actions,
  children,
  ...props
}) => {
  return (
    <MuiCard {...props}>
      {rootContent ? <CardContent>{rootContent}</CardContent> : null}
      {children}
      {actions ? <CardActions>{actions}</CardActions> : null}
    </MuiCard>
  );
};

export default Card;
