import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
    useTheme,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { AppRoutes } from '../domain/routes'

const layoutStyles: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
}

const linkStyles: React.CSSProperties = {
    display: 'block',
    marginTop: '24px',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'transparent',
}

const sideMenuStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    backgroundColor: '#DD1E3E',
    width: '120px',
    padding: 2,
    boxSizing: 'border-box',
}

const contentStyles: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

type SideMenuProps = {
    routes: AppRoutes
    children?: React.ReactNode
}

export const SideMenu: React.FC<SideMenuProps> = ({ children, routes }) => {
    const navigate = useNavigate()

    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    React.useEffect(() => {
        navigate(routes.FORM)
    }, [])

    return (
        <Box sx={layoutStyles}>
            {isDesktop ? (
                <Box sx={sideMenuStyles}>
                    <Link to={routes.FORM} style={linkStyles}>
                        Form
                    </Link>
                    <Link to={routes.TABLE} style={linkStyles}>
                        Table
                    </Link>
                </Box>
            ) : (
                <Paper
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                    elevation={3}
                >
                    <BottomNavigation showLabels>
                        <BottomNavigationAction
                            component={NavLink}
                            to={routes.FORM}
                            label="Form"
                            sx={{
                                '&.active': {
                                    fontWeight: 'bold',
                                    color: '#DD1E3E',
                                },
                            }}
                        />

                        <BottomNavigationAction
                            component={NavLink}
                            to={routes.TABLE}
                            label="Table"
                            sx={{
                                '&.active': {
                                    fontWeight: 'bold',
                                    color: '#DD1E3E',
                                },
                            }}
                        />
                    </BottomNavigation>
                </Paper>
            )}
            <Box sx={contentStyles}>{children}</Box>
        </Box>
    )
}
