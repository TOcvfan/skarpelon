'use client';
import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@/lib/mui';
import Link from 'next/link';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppContext } from './AppContext';

const NavBar = ({ navn, aktiv }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const { isLoggedIn, language, user, sprogfunktion } = useAppContext();
    const sprogting = (dan, eng) => {
        return (
            sprogfunktion(language, dan, eng)
        )
    }

    const link = { name: 'Links', link: '/links', targetSegment: 'links' };
    const piger = user?.role === "FISSE" ?
        { name: 'Rosie and Bella', link: '/loves_rosie_and_bella', targetSegment: 'loves_rosie_and_bella' }
        :
        { name: sprogting('Skrivebord', 'Desktop'), link: '/skrivebord', targetSegment: 'skrivebord' }

    let pagesLoggedIn = [
        { name: sprogting('Forside', 'Start page'), link: '/forside', targetSegment: 'forside' },
        { name: sprogting('Min Bil', 'My Car'), link: '/bil', targetSegment: 'bil' },
        { name: sprogting('2cv Campingvogn', '2cv caravan'), link: '/2cvcampingvogn', targetSegment: '2cvcampingvogn' },
        { name: sprogting('Profil', 'Profile'), link: '/profil', targetSegment: 'profil' },
        piger,
        { name: sprogting('Gæstebog', 'guestbook'), link: '/gaestebog', targetSegment: 'gaestebog' },
        link
    ]

    let pagesNotLoggedIn = [
        { name: sprogting('Hjem', 'home'), link: '/', targetSegment: null },
        { name: sprogting('Opret dig', 'Register'), link: '/bruger/login', targetSegment: 'bruger' },
        { name: sprogting('Log ind', 'Log in'), link: '/login', targetSegment: 'login' },
        link
    ]

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const MenuItems = ({ farve, retning }) => {
        const StyledLink = styled(Link)`
            text-decoration: none;
            color: ${farve};
                &:focus, &:hover, &:visited, &:link, &:active {
                    text-decoration: none;
                    color: ${farve};
            }
        `;

        const sider = () => {
            if (isLoggedIn) {
                return pagesLoggedIn
            } else {
                return pagesNotLoggedIn
            }
        }
        const bgfarve = farve === 'purple' ? 'yellow' : 'purple'
        const markering = {
            borderRadius: '20%',
            backgroundColor: bgfarve,
            fontWeight: 'bold'
        }

        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: retning,
            }}>
                {sider().map((p) => {
                    //console.log(p)
                    const aktivSide = (aktiv === p.targetSegment) ? markering : { backgroundColor: 'inherit' }
                    return (
                        <MenuItem onClick={handleCloseNavMenu} key={p.name} sx={
                            aktivSide
                        }>
                            <StyledLink prefetch={false} className='link' href={p.link}>
                                <Typography variant="div" textAlign="center">
                                    {p.name}
                                </Typography>
                            </StyledLink>
                        </MenuItem>
                    )
                })}
            </Box>
        )
    }

    return (
        <AppBar position="fixed" sx={{
            color: '#fff',
            background: 'blue'
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        {navn}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="purple"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItems farve='purple' retning='column' />
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'purple',
                            textDecoration: 'none',
                        }}
                    >
                        {navn}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MenuItems farve='white' retning='row' />
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="S">
                            S
                        </Avatar>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;