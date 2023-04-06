import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ButtonGroup, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import { Box, Stack } from '@mui/system';


const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    '& > *': {
      margin: 0,
    },
  },
}))

export interface Post {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: number;
  employeeSigDate: string;
  employeeSignatureName: string;
}

export const MainContext = createContext<{getPosts: () => void}>({getPosts: () => undefined});

export const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  let buttonStyles = useButtonStyles();

  const getPosts = async () => {
    let data = await fetch(`${process.env.REACT_APP_REACT_API}/ru/data/v3/testmethods/docs/userdocs/get`, 
    {
      method: 'GET',
      headers: {'x-auth': `${token}`},
    }).then(function(resp){
      return resp.json()}).catch(error=>console.log(error));
      setPostsList(data.data.map((item:any)=> ({
        id: item.id, 
        companySigDate: item.companySigDate,
        companySignatureName: item.companySignatureName,
        documentName: item.documentName,
        documentStatus: item.documentStatus,
        documentType: item.documentType,
        employeeNumber: item.employeeNumber,
        employeeSigDate: item.employeeSigDate,
        employeeSignatureName: item.employeeSignatureName
      }))
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  
  const removePost = async (id:string) => {
    let data = await fetch(`${process.env.REACT_APP_REACT_API}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
    {
      method: 'POST',
      headers: {'x-auth': `${token}`},
    }).then(function(resp){
      return resp.json()}).catch(error=>console.log(error));
      getPosts();
  };

  return (
    <div 
      style={{display:"flex", flexDirection:"column", alignItems: "center", justifyContent:"center"}}
      >  
        <Button
          style={{ marginTop: "7%", marginLeft: 0, fontWeight:"700"}}
          color='success'
          variant='contained'
          onClick={() => navigate('/createpost')}
        >
          add new
        </Button>
      <MainContext.Provider value ={{ getPosts} }>
        <TableContainer component={Paper} sx={{ display: { xs: "none", lg: "table"}, width: "97vw"}}>
          <Table sx={{ marginTop: '2%'}} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  borderTop: "2px solid black",
                  borderBottom: "2px solid black",
                  "& th": {
                    fontSize: "0.8rem",
                    fontWeight: "700",
                    color: "rgba(96, 96, 96)"
                  }
                }}
              >
                <TableCell>company<br/>SigDate</TableCell>
                <TableCell>company<br/>SignatureName</TableCell>
                <TableCell>document<br/>Name</TableCell>
                <TableCell>document<br/>Status</TableCell>
                <TableCell>document<br/>Type</TableCell>
                <TableCell>employee<br/>Number</TableCell>
                <TableCell>employee<br/>SigDate</TableCell>
                <TableCell>employee<br/>SignatureName</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postsList?.map((post, index)=>(
                <TableRow
                  key={index}
                  style={{ marginLeft: 5}}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                >
                  <TableCell>{dayjs(post.companySigDate).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                  <TableCell>{post.companySignatureName}</TableCell>
                  <TableCell>{post.documentName}</TableCell>
                  <TableCell>{post.documentStatus}</TableCell>
                  <TableCell>{post.documentType}</TableCell>
                  <TableCell>{post.employeeNumber}</TableCell>
                  <TableCell>{dayjs(post.employeeSigDate).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                  <TableCell>{post.employeeSignatureName}</TableCell>
                  <TableCell >
                  <div className={buttonStyles.root} style={{paddingLeft: 0, marginLeft: 0}}>
                      <ButtonGroup variant='outlined' aria-label='outlined button group'>
                        <Button
                          style={{ marginRight: 5, fontWeight:"700", borderRadius:"5px" }}
                          color="primary"
                          variant='contained'
                        >
                          <Link style={{textDecoration:"none", color:"white"}} to='/updatepost' state={{ post: post }}> 
                          edit</Link>
                        </Button>
                        <Button
                          style={{ marginRight: 5, fontWeight:"700", borderRadius:"5px"}}
                          color="warning"
                          variant='contained'
                          onClick={()=>removePost(post.id)}
                        >
                          delete
                        </Button>
                      </ButtonGroup>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainContext.Provider>
      <Box sx={{ display: { md: "Block", lg: "none" }}} mt={5} mb={5}>
      {postsList?.map((post)=>(
        <Box
          key={post.id}
          sx={{ '&:last-child td, &:last-child th': {border: 0}}}
          display={'flex'}
          flexDirection={'column'}
          fontSize={'0.8rem'}
          >
          <Stack direction="row" mt={1} alignItems={"center"} flexWrap={{sm:"nowrap", xs:"wrap"}} justifyContent={"center"}>
            <Typography 
              sx={{fontSize: {sm:'0.8rem', xs:"14px"}, fontWeight: 700, width: {sm:"180", xs:"100%"}, textAlign: {sm:'left', xs:"center"}}}
              >companySigDate:</Typography>
            <Box 
              sx={{fontSize: {sm:'0.8rem', xs:"14px"}, width:{sm:"180px", xs:"100%"}, textAlign:{sm:"start", xs:"center"}}}
              >{dayjs(post.companySigDate).format('DD/MM/YYYY HH:mm:ss')}</Box>
          </Stack>
          <Stack direction="row" mt={1} alignItems={"center"} flexWrap={{sm:"nowrap", xs:"wrap"}} justifyContent={"center"}>
            <Typography 
              sx={{fontSize: {sm:'0.8rem', xs:"14px"}, fontWeight: 700, width: {sm:"180", xs:"100%"}, textAlign: {sm:'left', xs:"center"}}}
            >companySignatureName:</Typography>
            <Box 
              sx={{fontSize: {sm:'0.8rem', xs:"14px"}, width:{sm:"180px", xs:"100%"}, textAlign:{sm:"start", xs:"center"}}}
              >{post.companySignatureName}</Box>
          </Stack>
          <Stack direction="row" mt={1} alignItems={"center"} flexWrap={{sm:"nowrap", xs:"wrap"}} justifyContent={"center"}>
            <Typography 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, fontWeight: 700, width: {sm:"180", xs:"100%"}, textAlign: {sm:'left', xs:"center"}}}
              >documentName:</Typography>
            <Box 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, width:"180px", textAlign:{sm:"start", xs:"center"}}}
              >{post.documentName}</Box>
          </Stack>
          <Stack direction="row" mt={1} alignItems={"center"} flexWrap={{sm:"nowrap", xs:"wrap"}} justifyContent={"center"}>
            <Typography 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, fontWeight: 700, width: {sm:"180", xs:"100%"}, textAlign: {sm:'left', xs:"center"}}}
              >documentStatus:</Typography>
            <Box 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, width:"180px", textAlign:{sm:"start", xs:"center"}}}
              >{post.documentStatus}</Box>
          </Stack>
          <Stack direction="row" mt={1} alignItems={"center"} flexWrap={{sm:"nowrap", xs:"wrap"}} justifyContent={"center"}>
            <Typography 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, fontWeight: 700, width: {sm:"180", xs:"100%"}, textAlign: {sm:'left', xs:"center"}}}
              >documentType:</Typography>
            <Box 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, width:"180px", textAlign:{sm:"start", xs:"center"}}}
              >{post.documentType}</Box>
          </Stack>
          <Stack direction="row" mt={1} alignItems={"center"} flexWrap={{sm:"nowrap", xs:"wrap"}} justifyContent={"center"}>
            <Typography 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, fontWeight: 700, width: {sm:"180", xs:"100%"}, textAlign: {sm:'left', xs:"center"}}}
              >employeeNumber:</Typography>
            <Box 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, width:"180px", textAlign:{sm:"start", xs:"center"}}}
              >{post.employeeNumber}</Box>
          </Stack>
          <Stack direction="row" mt={1} alignItems={"center"} flexWrap={{sm:"nowrap", xs:"wrap"}} justifyContent={"center"}>
            <Typography 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, fontWeight: 700, width: {sm:"180", xs:"100%"}, textAlign: {sm:'left', xs:"center"}}}
              >employeeSigDate:</Typography>
            <Box 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, width:"180px", textAlign:{sm:"start", xs:"center"}}}
              >{dayjs(post.employeeSigDate).format('DD/MM/YYYY HH:mm:ss')}</Box>
          </Stack>
          <Stack direction="row" mt={1} alignItems={"center"} flexWrap={{sm:"nowrap", xs:"wrap"}} justifyContent={"center"}>
            <Typography 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, fontWeight: 700, width: {sm:"180", xs:"100%"}, textAlign: {sm:'left', xs:"center"}}}
              >employeeSignatureName:</Typography>
            <Box 
              sx={{fontSize: {sm:'0.8rem', xs:"12px"}, width:"180px", textAlign:{sm:"start", xs:"center"}}}
              >{post.employeeSignatureName}</Box>
          </Stack>
          <div className={buttonStyles.root} style={{ paddingLeft: 0 }}>
            <ButtonGroup variant='outlined' aria-label='outlined button group' style={{margin:'25px auto'}}>
              <Button
                style={{ marginRight: 10, borderRadius:"5px"}}
                color="primary"
                variant='contained'
                >
                <Link style={{textDecoration:"none", color:"white", fontWeight:"700"}} to='/updatepost' state={{ post: post }}> edit</Link>
              </Button>
              <Button
                style={{ marginLeft: 10, fontWeight:"700", borderRadius:"5px"}}
                color="warning"
                variant='contained'
                onClick={()=>removePost(post.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </div>
        </Box>
      ))}              
      </Box>
    </div>
  );
};