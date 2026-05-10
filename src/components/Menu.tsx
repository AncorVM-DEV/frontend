import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';

export default function Menu() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // @ts-ignore
    const userData = useSelector((state: any) => state.authenticator);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate('/');
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {/* A cada opción del menú lateral le pongo su Tooltip para que se vea a dónde lleva cada una */}
                <ListItem disablePadding>
                    <Tooltip title="Volver a la pantalla principal (Home)" arrow placement="right">
                        <ListItemButton component={Link} to="/home">
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Inicio" />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
                {/* 2.1 Gestión de permisos: sólo el usuario con rol admin va a poder generar informes */}
                {userData.userRol === 'admin' && (
                    <ListItem disablePadding>
                        <Tooltip title="Ir a la página de Informes (solo administradores)" arrow placement="right">
                            <ListItemButton component={Link} to="/reports">
                                <ListItemIcon><AssessmentIcon /></ListItemIcon>
                                <ListItemText primary="Informes" />
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                )}
                <ListItem disablePadding>
                    {/* Aquí pongo el enlace a mi PDF de manual con target='_blank' para que se abra en otra pestaña y no me cierre la app */}
                    <Tooltip title="Abre el manual de usuario en una nueva pestaña" arrow placement="right">
                        <ListItemButton component={Link} to="/Valentin_Martin_Ancor_UT4A1.pdf" target="_blank">
                            <ListItemIcon><HelpIcon /></ListItemIcon>
                            <ListItemText primary="Ayuda" />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
                <ListItem disablePadding>
                    <Tooltip title="Cerrar sesión y volver al login" arrow placement="right">
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Salir" />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1, mb: 2 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* Le meto el Tooltip al icono de la hamburguesa para que el usuario sepa que abre el menú */}
                    <Tooltip title="Abrir menú de navegación" arrow placement="bottom">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Gestión de Cartas
                    </Typography>
                    {userData?.isAutenticated && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ mr: 1 }}>
                                {userData.userName}
                            </Typography>
                            {/* 2.3 Diferenciación de iconos de usuario según el rol */}
                            {userData.userRol === 'admin' ? <AccountCircle /> : <span style={{ fontSize: '1.5rem' }}>🦉</span>}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    );
}
