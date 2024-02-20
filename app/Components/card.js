"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

export default function Kort({ children, titel, billede, om }) {
    //console.log(billede.src)
    return (
        <Card sx={{ maxWidth: 345, minWidth: 340, m: 2 }} raised>
            <CardMedia
                component="img"
                height="340"
                image={billede}
                alt={om}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {titel}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                    {children}
                </Typography>
            </CardContent>
        </Card>

    );
}
