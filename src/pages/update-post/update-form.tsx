import React, { useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { Post as IPost } from '../main/main';
import { Button, ButtonGroup, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const UpdateForm = () => {
  const location = useLocation();
  const { post } = location.state;
  console.log(post.id);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [updPost, setUpdPost] = useState<IPost>({
    id: post.id,
    companySigDate: post.companySigDate ? post.companySigDate : "",
    companySignatureName: post.companySignatureName ? post.companySignatureName : "",
    documentName: post.documentName ? post.documentName : "",
    documentStatus: post.documentStatus ? post.documentStatus : "",
    documentType: post.documentType ? post.documentType : "",
    employeeNumber: post.employeeNumber !== null ? post.employeeNumber : 0,
    employeeSigDate: post.employeeSigDate ? post.employeeSigDate : "",
    employeeSignatureName: post.employeeSignatureName ? post.employeeSignatureName : "",
  });
  
  console.log(post);
  const onUpdatePost = async (e:any) => {
    e.preventDefault();
    let result = await fetch(`${process.env.REACT_APP_REACT_API}/ru/data/v3/testmethods/docs/userdocs/set/${post.id}`, {
      method: 'POST',
      headers: {
        'x-auth': `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companySigDate: updPost.companySigDate,
        companySignatureName: updPost.companySignatureName,
        documentName: updPost.documentName,
        documentStatus: updPost.documentStatus,
        documentType: updPost.documentType,
        employeeNumber: updPost.employeeNumber,
        employeeSigDate: updPost.employeeSigDate,
        employeeSignatureName: updPost.companySignatureName,
      })
    }).then(function(resp){
      return resp.json()}).catch(error=>console.log(error));
      console.log(result);
      navigate("/main");
  };

  return (
    <React.Fragment>
      <div>
        <Typography variant='h5' fontWeight="700" marginTop='5%' color='rgb(35, 114, 217)'>EDIT RECORD</Typography>
        <form onSubmit={onUpdatePost}>
          <TextField 
            type="datetime-local"
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
            value={dayjs(updPost.companySigDate).format('YYYY-MM-DD HH:mm:ss')}
            onChange={e=> setUpdPost({...updPost, companySigDate: e.target.value})}
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
            value={updPost.companySignatureName}
            onChange={e=> setUpdPost({...updPost, companySignatureName: e.target.value})}
          />
          <TextField
            type="text"
            placeholder="documentName"
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
            value={updPost.documentName}
            onChange={e=> setUpdPost({...updPost, documentName: e.target.value})}
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
            value={updPost.documentStatus}
            onChange={e=> setUpdPost({...updPost, documentStatus: e.target.value})}
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
            value={updPost.documentType}
            onChange={e=> setUpdPost({...updPost, documentType: e.target.value})}
          />
          <TextField
            type="number"
            placeholder="employeeNumber"
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
            value={updPost.employeeNumber}
            onChange={e=> setUpdPost({...updPost, employeeNumber: Number(e.target.value)})}
          />
          <TextField
            type="datetime-local"
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
            value={dayjs(updPost.employeeSigDate).format('YYYY-MM-DD HH:mm:ss')}
            onChange={e=> setUpdPost({...updPost, employeeSigDate: e.target.value})}
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
            value={updPost.employeeSignatureName}
            onChange={e=> setUpdPost({...updPost, employeeSignatureName: e.target.value})}
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
              Edit
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
              onClick={()=> navigate("/main")}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </React.Fragment>
  );
};