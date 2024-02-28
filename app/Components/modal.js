"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

export default function ModalElement({ width, children, titel, open, handleOpen, disableEscapeKeyDown, color }) {

    const style = {
        color: color ? color : 'black',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width ? width : 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal
                keepMounted
                disableEscapeKeyDown={disableEscapeKeyDown}
                open={open}
                onClose={handleOpen}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ color: 'blue' }} id="keep-mounted-modal-title" variant="h4" component="h2">
                        {titel}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
                        {children}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}