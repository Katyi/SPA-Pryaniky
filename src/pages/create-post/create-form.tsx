import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Post as IPost } from '../main/main';
import { Button, ButtonGroup, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const CreateForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [newPost, setNewPost] = useState<IPost>({
    id: '',
    companySigDate: '',
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: 0,
    employeeSigDate: '',
    employeeSignatureName: '',
  });

  const onCreatePost = async (e:any) => {
    e.preventDefault();
    let result = await fetch(`${process.env.REACT_APP_REACT_API}/ru/data/v3/testmethods/docs/userdocs/create`,
    {
      method: 'POST',
      headers: {
        'x-auth': `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companySigDate: newPost.companySigDate,
        companySignatureName: newPost.companySignatureName,
        documentName: newPost.documentName,
        documentStatus: newPost.documentStatus,
        documentType: newPost.documentType,
        employeeNumber: newPost.employeeNumber,
        employeeSigDate: newPost.employeeSigDate,
        employeeSignatureName: newPost.employeeSignatureName,
      })
    }).then(function(resp){
      return resp.json()}).catch(error=>console.log(error));
      navigate("/main");
  };

  return (
    <React.Fragment>
      <div>
        <Typography variant='h5' fontWeight="700" marginTop='1.5%' color='rgb(35, 114, 217)'>ADD NEW RECORD</Typography>
        <form autoComplete="off" onSubmit={onCreatePost}>
          <TextField
            type="datetime-local"
            variant="outlined"
            color="primary"
            helperText='companySigDate'
            sx={{
              marginTop:"5px", 
              background:'rgba(222, 239, 248, 0.877)',
              borderRadius: '5px',
              width:{sm:"300px", xs:"100%"},
              input: {color: 'rgb(35, 114, 217)'}
            }}
            fullWidth
            value={dayjs(newPost.companySigDate).format('YYYY-MM-DD HH:mm:ss')}
            onChange={(e)=> setNewPost({...newPost, companySigDate: e.target.value})}
          />
          <TextField
            type="text"
            placeholder="companySignatureName"
            variant="outlined"
            color="primary"
            sx={{
              marginTop:"5px", 
              background:'rgba(222, 239, 248, 0.877)',
              borderRadius: '5px',
              width:{sm:"300px", xs:"100%"},
              input: {color: 'rgb(35, 114, 217)'}
            }}
            fullWidth
            value={newPost.companySignatureName}
            onChange={e=> setNewPost({...newPost, companySignatureName: e.target.value})}
          />
          <TextField
            type="text"
            placeholder="documentName"
            name="documentName"
            variant="outlined"
            color="primary"
            sx={{
              marginTop:"5px", 
              background:'rgba(222, 239, 248, 0.877)',
              borderRadius: '5px',
              width:{sm:"300px", xs:"100%"},
              input: {color: 'rgb(35, 114, 217)'}
            }}
            fullWidth
            value={newPost.documentName}
            onChange={e=> setNewPost({...newPost, documentName: e.target.value})}
            required
          />
          <TextField
            type="text"
            placeholder="documentStatus"
            variant="outlined"
            color="primary"
            sx={{
              marginTop:"5px", 
              background:'rgba(222, 239, 248, 0.877)',
              borderRadius: '5px',
              width:{sm:"300px", xs:"100%"},
              input: {color: 'rgb(35, 114, 217)'}
            }}
            fullWidth
            value={newPost.documentStatus}
            onChange={e=> setNewPost({...newPost, documentStatus: e.target.value})}
            required
          />
          <TextField
            type="text"
            placeholder="documentType"
            variant="outlined"
            color="primary"
            sx={{
              marginTop:"5px", 
              background:'rgba(222, 239, 248, 0.877)',
              borderRadius: '5px',
              width:{sm:"300px", xs:"100%"},
              input: {color: 'rgb(35, 114, 217)'}
            }}
            fullWidth
            value={newPost.documentType}
            onChange={e=> setNewPost({...newPost, documentType: e.target.value})}
          />
          <TextField
            type="number"
            placeholder="employeeNumber"
            variant="outlined"
            color="primary"
            helperText='employeeNumber'
            sx={{
              marginTop:"5px", 
              background:'rgba(222, 239, 248, 0.877)',
              borderRadius: '5px',
              width:{sm:"300px", xs:"100%"},
              input: {color: 'rgb(35, 114, 217)'}
            }}
            fullWidth
            value={newPost.employeeNumber}
            onChange={e=> setNewPost({...newPost, employeeNumber: Number(e.target.value)})}
          />
          <TextField
            type="datetime-local"
            variant="outlined"
            color="primary"
            helperText='employeeSigDate'
            sx={{
              marginTop:"5px", 
              background:'rgba(222, 239, 248, 0.877)',
              borderRadius: '5px',
              width:{sm:"300px", xs:"100%"},
              input: {color: 'rgb(35, 114, 217)'}
            }}
            fullWidth
            value={dayjs(newPost.employeeSigDate).format('YYYY-MM-DD HH:mm:ss')}
            onChange={e=> setNewPost({...newPost, employeeSigDate: e.target.value})}
          />
          <TextField
            type="text"
            placeholder="employeeSignatureName"
            variant="outlined"
            color="primary"
            sx={{
              marginTop:"5px", 
              background:'rgba(222, 239, 248, 0.877)',
              borderRadius: '5px',
              width:{sm:"300px", xs:"100%"},
              input: {color: 'rgb(35, 114, 217)'}
            }}
            fullWidth
            value={newPost.employeeSignatureName}
            onChange={e=> setNewPost({...newPost, employeeSignatureName: e.target.value})}
          />

          <ButtonGroup
            variant='outlined' 
            aria-label='outlined button group'
            sx={{marginTop:"15px", flexWrap:"wrap", alignItems:"center", justifyContent:"center"}}
          >
            <Button 
              type="submit"
              variant="outlined"
              color="primary"
              style={{ 
                marginRight: 5,
                marginTop: 5,
                background:'rgba(222, 239, 248, 0.877)',
                height:'35px',
                borderRadius:"5px",
                fontWeight:"700"
              }}
            >
              Create
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ 
                marginRight: 5,
                marginTop: 5,
                background:'rgba(222, 239, 248, 0.877)',
                height:'35px',
                borderRadius:"5px",
                fontWeight:"700"
              }}
              onClick={() => navigate("/main")}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </React.Fragment>
  );
};