import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import Logo from './Logo';
import { Link } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Playlists' ,'Logout'];
const settingsLink = ['/app/userId/profile', '/app/userId/account', '/app/userId/dashboard', '/app/userId/playlists', '/logout'];

const Click = () => {
  // if (document.getElementById("dropdown").classList.contains("hidden")) {
    document.getElementById("dropdown").classList.remove("hidden");
  // } else {
  //     document.getElementById("dropdown").classList.add("hidden")
  // }
}
const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className='m-2 top-0 flex flex-row justify-center items-center'>
      <div className='flex absolute top-2 left-0'>
        <Logo />
        <p className='hidden lg:block fixed text-xl font-bold dark:text-white top-6 left-24'>STREAMVERSE</p>
      </div>
      <div className='w-[85%] md:w-[60%] justify-end mr-5 flex items-center md:justify-center'>
        <form class="flex items-center w-[70%] ">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input autoComplete={false} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required="" />
          </div>
          <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span class="sr-only">Search</span>
          </button>

        </form>
        
      </div>
      <div className='fixed right-1 md:right-4 lg:right-20'>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip >
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="" />
            </IconButton>
          </Tooltip>
          <Menu
            
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting, index) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Link className='dark:bg-black dark:text-white content-center' to={settingsLink[index]}>{setting}</Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
      
    </div>
  );
}
export default Header;
