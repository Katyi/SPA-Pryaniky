import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import {Link} from "@mui/material"

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
        <Link href="/" color="inherit" underline="none" variant='h6'>Login</Link>
      </StyledToolbar>
    </AppBar>
  );
};