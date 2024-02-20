import React from 'react';
import Button from '@mui/material/Button';

export default function ButtonIcon({ children, disabled, type, onClick, sx }) {
    return (
        <div>
            <Button variant="text" sx={sx} type={type} disabled={disabled} onClick={onClick}>
                {children}
            </Button>
        </div>
    );
}