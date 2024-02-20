import React from 'react';
import Button from '@mui/material/Button';
import { amber } from '@mui/material/colors';

const CustomizedButtons = ({ children, disabled, type, onClick, width, hojre, height, bgcolor, hoverColor, color, shadow }) => {

  const colorButton = {
    color: color ? color : 'white',
    fontWeight: 'bold',
    background: bgcolor ? bgcolor : 'blue',
    '&:hover': {
      background: hoverColor ? hoverColor : 'aquamarine',
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