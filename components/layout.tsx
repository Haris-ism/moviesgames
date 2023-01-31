import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useState,useEffect} from 'react';
import Link from 'next/link';
import { useContext,useRef } from "react"
import { UserContext } from "../statemanagement/userContext"
import { typeProps } from "../utils/types";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import Collapse from '@mui/material/Collapse';
import KeyIcon from '@mui/icons-material/Key';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieIcon from '@mui/icons-material/Movie';
import { useRouter } from 'next/router'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Grid,InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Layout(props:typeProps) {
  let history = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState({
    user:false,
    editor:false
  });
  console.log("open:",open)
  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
    history.push(`/`)
  }
  const handleClick = (input:"user"|"editor") => {
    setOpen(true)
    if (input=="user"){
      setOpenAccordion({
        ...openAccordion,
        user:!openAccordion.user
      });
    }
    if (input=="editor"){
      setOpenAccordion({
        ...openAccordion,
        editor:!openAccordion.editor
      });
    }

    }
  const context = useContext(UserContext)
  const setUser = context.setUser
  const user=context.user
  const token = context.token
  const setToken=context.setToken
  useEffect(()=>{
    if (localStorage.getItem('userId')) {
      setUser(localStorage.getItem('userId'))
      setToken(localStorage.getItem('token'))
    }
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenAccordion({
      user:false,
      editor:false
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container sm={12}>
            <Grid item sm={4}>

            </Grid>
            <Grid item sm={4}>
              <Box 
                  component="form" 
                  sx={{
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      position:"relative",
                      left:"0px"
                      }}>
                  <Box 
                  sx={{
                      borderRadius:"3px",
                      outlineStyle:"solid",
                      outlineColor:"#b0bec5",
                      outlineWidth:"1px",
                      width:"250px",
                      height:"38px",
                      paddingLeft:"10px",
                      display:"flex",
                      alignItems:"center",
                      }} 
                  >
                      <InputBase
                          color="secondary"
                          placeholder="Search"
                          size="small"
                          sx={{
                            width:"220px",
                            color:"white",
                            
                          }}
                          // value={search}
                          // onChange={handleChangeSearch}
                      />
                      {/* {
                          search!="" ?
                          <IconButton 
                              sx={{
                                  width:"10px",
                                  height:"10px"
                                  }} 
                              onClick={handleCancelSearch} 
                          >
                              <ClearIcon sx={{fontSize:"10px"}} />
                          </IconButton> :
                          null

                      } */}
                  </Box>
                  <IconButton  
                      sx={{ p: '10px' }} 
                      component="label" 
                      color="inherit"
                      // onClick={handleSearch}
                  >
                      <SearchRoundedIcon />
                      <input hidden type="submit"/>
                  </IconButton>
              </Box>
            </Grid>
            <Grid item sm={4}>
              <Box 
                sx={{
                  width:"100%",
                  height:"50px",
                  display:"flex", 
                  justifyContent:"right",
                  // backgroundColor:"coral"
                  }}
                >
                <Link href="/" >
                  <Grid 
                    container 
                    sx={{
                      // backgroundColor:"aqua",
                      display:"flex",
                      justifyContent:"center"
                      }}>
                    <Grid 
                      item 
                      sm={12} 
                      sx={{
                        display:"flex",
                        justifyContent:"center",
                        marginBottom:"0px",
                        paddingBottom:"0px",
                        height:"33px"
                        }}>
                      <IconButton
                        color="inherit"
                        sx={{
                          // backgroundColor:"crimson",
                          width:"40px",
                          height:"40px"
                        }}
                        >
                        <HomeRoundedIcon />
                      </IconButton>
                    </Grid>
                    <Grid item sm={12} sx={{display:"flex",justifyContent:"center"}}>
                      <Typography sx={{fontSize:"0.8rem"}}>
                        Home
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
                <Link href="/games" >
                  <Grid 
                    container 
                    sx={{
                      display:"flex",
                      justifyContent:"center"
                      }}>
                    <Grid 
                      item 
                      sm={12} 
                      sx={{
                        display:"flex",
                        justifyContent:"center",
                        marginBottom:"0px",
                        paddingBottom:"0px",
                        height:"33px"
                        }}>
                      <IconButton
                        color="inherit"
                        sx={{
                          width:"40px",
                          height:"40px"
                        }}
                        >
                        <SportsEsportsIcon />
                      </IconButton>
                    </Grid>
                    <Grid item sm={12} sx={{display:"flex",justifyContent:"center"}}>
                      <Typography sx={{fontSize:"0.8rem"}}>
                        Games
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
                <Link href="/movies" >
                  <Grid 
                    container 
                    sx={{
                      display:"flex",
                      justifyContent:"center"
                      }}>
                    <Grid 
                      item 
                      sm={12} 
                      sx={{
                        display:"flex",
                        justifyContent:"center",
                        marginBottom:"0px",
                        paddingBottom:"0px",
                        height:"33px"
                        }}>
                      <IconButton
                        color="inherit"
                        sx={{
                          width:"40px",
                          height:"40px"
                        }}
                        >
                        <MovieIcon />
                      </IconButton>
                    </Grid>
                    <Grid item sm={12} sx={{display:"flex",justifyContent:"center"}}>
                      <Typography sx={{fontSize:"0.8rem"}}>
                        Movies
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        { user ?
          <>
          <List>
            <ListItem key={1} disablePadding sx={{ display: 'block'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>handleClick("user")}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',

                  }}
                  >
                  <AccountCircleIcon /> 
                </ListItemIcon>
                <ListItemText primary={"User"} sx={{ opacity: open ? 1 : 0 }}  />
                  {
                    open ? 
                    <>
                      {
                        openAccordion.user ? 
                        <ExpandLess/> : 
                        <ExpandMore /> 
                      }
                    </> : 
                    null
                  }
              </ListItemButton>
              <Collapse in={openAccordion.user} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link href="/changepassword">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <KeyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Change Password" />
                  </ListItemButton>
                  </Link>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </List>
              </Collapse>
          </ListItem>
        </List>
        
        <List>
          <ListItem key={2} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>handleClick("editor")}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  >
                  <KeyboardIcon /> 
                </ListItemIcon>
                <ListItemText primary={"Editor"} sx={{ opacity: open ? 1 : 0 }}  />
                {
                    open ? 
                    <>
                      {
                        openAccordion.editor ? 
                        <ExpandLess/> : 
                        <ExpandMore /> 
                      }
                    </> : 
                    null
                  }
              </ListItemButton>
              <Collapse in={openAccordion.editor} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link href="/auth/games">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <SportsEsportsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Games" />
                  </ListItemButton>
                  </Link>
                </List>
                <List component="div" disablePadding>
                <Link href="/auth/movies">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <MovieIcon />
                    </ListItemIcon>
                    <ListItemText primary="Movies" />
                  </ListItemButton>
                </Link>
                </List>
              </Collapse>
          </ListItem>
        </List>
        </> :
          <>
          <List>
            <ListItem key={1} disablePadding sx={{ display: 'block' }}>
              <Link href="/login" style={{display:"flex",alignItems:"center"}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  >
                  <LoginIcon /> 
                </ListItemIcon>
                <ListItemText primary={"Login"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </Link>
          </ListItem>
        </List>
        <List>
          <ListItem key={2} disablePadding sx={{ display: 'block' }}>
            <Link href="/register" style={{display:"flex",alignItems:"center"}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  >
                  <PersonAddAlt1Icon /> 
                </ListItemIcon>
                <ListItemText primary={"Register"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </Link>
          </ListItem>
        </List>
        </>
      }
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}