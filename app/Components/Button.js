import React from 'react';
import Button from '@mui/material/Button';
import { amber } from '@mui/material/colors';

const CustomizedButtons = ({ children, disabled, type, onClick, width, hojre, height, bgcolor, hoverColor, color, shadow, disabledColor }) => {

  const colorButton = {
    color: color ? color : 'white',
    fontWeight: 'bold',
    background: bgcolor ? bgcolor : 'radial-gradient(circle, rgba(158,26,176,1) 32%, rgba(55,55,182,1) 63%, rgba(255,211,0,1) 100%)',
    '&:hover': {
      background: hoverColor ? hoverColor : amber[700],
    },
    '&:disabled': {
      backgroundColor: 'transparent',
      color: disabledColor ? disabledColor : 'transparent'
    },
    borderRadius: 10,
    height,
    width,
    mr: hojre,
    mb: 1,
    mt: 1,
    boxShadow: shadow ? `5px 5px 8px blue` : 'none'
  };

  return (
    <div>
      <Button variant="contained" sx={colorButton} type={type} disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
}
export default CustomizedButtons;