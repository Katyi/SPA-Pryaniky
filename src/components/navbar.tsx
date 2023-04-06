import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  flexWrap:"wrap"
});

export const Navbar = () => { 

  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Typography variant='h6'>Page of records</Typography>
        <Link to="/" style={{color:"white", fontSize:"20px", fontWeight:"500", textDecoration:"none"}}>Login</Link>
      </StyledToolbar>
    </AppBar>
  );
};