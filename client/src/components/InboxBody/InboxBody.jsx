import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";

// setting headers for REST Api calls
const config = {
  headers: {
    "Content-type": "application/json",
  },
};

//custom styling for modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};



const InboxBody = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  //Api request to fetch all messages of the user
  const fetchUserMessages = async () => {
    const email = await JSON.parse(localStorage.getItem("userData")).email;
    axios
      .get(`/user/fetchMessages?email=${email}`, config)
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((err) => {
        console.log(err.response.data.messsage);
      });
  };

  //Api request to fetchall Users
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

  //Api request to forward message

  const forwardMessage = async ({ recipient }, messageId) => {
    const email = await JSON.parse(localStorage.getItem("userData")).email;
    const forward = {
      forwardedBy: email,
      forwardedTo: recipient,
    };
    console.log(forward);
    axios
      .patch(`user/forwardMessage?messageId=${messageId}`, forward, config)
      .then(({ data }) => {
        console.log(data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };


  // functions to be called on each mounting
  React.useEffect(() => {
    fetchUserMessages();
    fetchAllUsers();
  }, []);

  //Accordion open/Close handler
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //react-hooks-form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  

  return (
    <Box sx={{ marginTop: "25px" }}>
      {messages.map((message, index) => {
        return (
          <Accordion
            key={index}
            expanded={expanded === `${index}`}
            onChange={handleChange(`${index}`)}
            style={{ marginTop: "10px" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <strong>From:</strong> {message.sender}
                <br />
                <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                  <strong>On:</strong>
                  {message.sendDate}
                  <br />
                  <strong>At:</strong>
                  {message.sendTime}
                </p>
              </Typography>

              {message.forwards && (
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  <strong>Forwarded by:</strong> {message.forwards.forwardedBy}
                  <br />
                  <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                    <strong>On:</strong>
                    {message.forwards.forwardedDate}
                    <br />
                    <strong>At:</strong>
                    {message.forwards.forwardedTime}
                  </p>
                </Typography>
              )}

              <Typography>
                <strong>Subject:</strong>
                {message.subject}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>Message:</strong>
                <br />
                {message.message}
              </Typography>
              <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button variant="outlined" onClick={handleOpen}>
                  Forward
                </Button>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box
                      component="form"
                      onSubmit={handleSubmit((e) => {
                        forwardMessage(e, message._id);
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
                        helperText={
                          errors.recipient ? errors.recipient.message : ""
                        }
                      >
                        {users.map((user, index) => (
                          <MenuItem key={index} value={user.email}>
                            {user.name}
                          </MenuItem>
                        ))}
                      </TextField>

                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Forward
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default InboxBody;
