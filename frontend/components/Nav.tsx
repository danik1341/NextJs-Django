import React from 'react';
import { Toolbar, AppBar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Nav:React.FC = () => {
    
    return (
        <AppBar position='static'>
            <Toolbar className="flex justify-between items-center px-4">
                <IconButton edge='start' className='mr-2' color='inherit' aria-label='menu'>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' className='flex-grow'>
                    Local Reviews
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
export default Nav;