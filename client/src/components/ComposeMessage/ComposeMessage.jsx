import { Box, Button, Container, MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
 const config = {
   headers: {
     "Content-type": "application/json",
   },
 };

function ComposeMessage() {
  const [users, setUsers] = React.useState([]);

  const fetchAllUsers = () => {
    axios
      .get("/user/fetchAllUsers")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log("Error", error.response.data.message);
      });
  };

  const sendMessage = async (messageData) => {

    messageData.sender = await JSON.parse(localStorage.getItem("userData")).email;
    
    axios.post('/user/sendMessage', messageData, config).then(({data}) => {
      console.log(data.message)
    }).catch((err) => {
      console.log(err.response.data.message)
    })
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit((e) => {
          sendMessage(e);
        })}
        noValidate
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextField
          id="recipient"
          name="recipient"
          select
          label="Recipient"
          {...register("recipient", {
            required: "Choose a recipient",
          })}
          error={errors.recipient}
          helperText={errors.recipient ? errors.recipient.message : ""}
        >
          {users.map((user, index) => (
            <MenuItem key={index} value={user.email}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <TextField
          id="message"
          name="message"
          label="Message"
          multiline
          fullWidth
          rows={6}
          {...register("message", {
            required: "This field can't be empty",
            minLength: {
              value: 5,
              message: "Message too short",
            },
          })}
          error={errors.message}
          helperText={errors.message ? errors.message.message : ""}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          send
        </Button>
      </Box>
    </Container>
  );
}

export default ComposeMessage;
