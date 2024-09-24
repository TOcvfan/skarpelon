"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

export default function Kort({ children, titel, billede, om }) {
    return (
        <Card sx={{ maxWidth: 345, minWidth: 340, m: 2 }} raised>
            <CardMedia
                component="img"
                height="340"
                image={billede.src}
                alt={om}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {titel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {children}
                </Typography>
            </CardContent>
        </Card>

    );
}
