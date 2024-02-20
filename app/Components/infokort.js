"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    color: 'blueviolet',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function KortUdvid({ children, titel, billede, om, width, avatar, avatarLabel, beskrivelse, undertitel }) {

    return (
        <Card sx={{ width, m: 2 }} raised>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label={avatarLabel}>
                        {avatar}
                    </Avatar>
                }
                title={titel}
                subheader={undertitel}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {beskrivelse}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary" component="div">
                    {children}
                </Typography>
            </CardContent>
        </Card>

    );
}
