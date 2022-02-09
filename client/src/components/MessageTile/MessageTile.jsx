import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";
import axios from "axios";
const config = {
  headers: {
    "Content-type": "application/json",
  },
};

const MessageTile = () => {

  const [expanded, setExpanded] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  const fetchUserMessages = async () => {
    const email = await JSON.parse(localStorage.getItem("userData")).email;
    axios.get(`/user/fetchMessages?email=${email}`, config).then(({ data }) => {
      
      setMessages(data)
      
    }).catch((err) => {
      console.log(err.response.data.messsage)
    });
  }

React.useEffect(() => {
  fetchUserMessages()
}, [])






  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ marginTop: "25px" }}>

      {messages.map((message,index) => {
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
              </Typography>
              <Typography sx={{ color: "text.secondary", marginLeft: "80px" }}>
                On:{message.date}
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
                <Button variant="outlined">Forward</Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
      
        

      
      
    </Box>
  );
};

export default MessageTile;
