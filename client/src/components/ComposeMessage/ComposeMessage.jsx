import { Box, Button, Container, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

// setting headers for REST Api calls
 const config = {
   headers: {
     "Content-type": "application/json",
   },
 };

function ComposeMessage() {
  const [users, setUsers] = React.useState([]);

  //Api call to fetch all users
  const fetchAllUsers = async () => {
    const email = await JSON.parse(localStorage.getItem("userData")).email;
    axios
      .get(`/user/fetchAllUsers?email=${email}`)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log("Error", error.response.data.message);
      });
  };

  //Api call to send message
  const sendMessage = async (messageData) => {

    messageData.sender = await JSON.parse(localStorage.getItem("userData")).email;
    
    axios.post('/user/sendMessage', messageData, config).then(({data}) => {
      console.log(data.message)
    }).catch((err) => {
      console.log(err.response.data.message)
    })
  };

//react-hooks-form Validation
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
          required
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
          name="subject"
          id="subject"
          label="Subject"
          variant="outlined"
          fullWidth
          required
          {...register("subject", {
            required: "This field can't be empty",
            minLength: {
              value: 5,
              message: "Minimun 5 charecters",
            },
          })}
          error={errors.subject}
          helperText={errors.subject ? errors.subject.message : ""}
        />
        <br />
        <TextField
          id="message"
          name="message"
          label="Message"
          multiline
          fullWidth
          required
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
