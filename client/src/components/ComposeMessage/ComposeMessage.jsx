import { Box, Button, Container, MenuItem, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import axios from 'axios';

function ComposeMessage() {

  const [recipient, setRecipient] = React.useState(null);
  const [users, setUsers] =React.useState([]);
  
  const fetchAllUsers = () => {
    axios.get('/user/fetchAllUsers').then(({ data }) => {
      setUsers(data);
    }).catch((error) => {
      console.log("Error",error.response.data.message);
    })
  } 

const handleChange = (event) => {
  setRecipient(event.target.value);
};
  
  useEffect(() => {
    fetchAllUsers();
  }, [])
  

  return (
    <Container
      maxWidth="md"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          console.log(e);
        }}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          id="receipient"
          select
          label="Recipient"
          value={recipient}
          onChange={handleChange}
          helperText="Please choose a recipient"
        >
          {users.map((user, index) => (
            <MenuItem key={index} value={user.email}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          send
        </Button>
      </Box>
    </Container>
  );
}

export default ComposeMessage