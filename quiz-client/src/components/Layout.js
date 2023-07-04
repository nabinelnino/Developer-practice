import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import useStateContext from '../hooks/useStateContext'
import logo from '../img/image_2.jpg'

export default function Layout() {
    const { resetContext } = useStateContext()
    const navigate = useNavigate()

    const logout = () => {
        resetContext()
        navigate("/")
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar sx={{ width: 640, m: 'auto' }}>
                <img src={logo} alt="Logo" style={{ marginRight: '10px' }} /> {/* add the img tag with the src attribute pointing to your image file */}
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{ flexGrow: 1 }}>
                        Quiz App
                    </Typography>
                    <Button onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </>
    )
}
