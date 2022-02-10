
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import ComposeMessage from "../../components/ComposeMessage/ComposeMessage";
import InboxBody from "../../components/InboxBody/InboxBody";
import NavBar from "../../components/NavBar/NavBar";
import SendBody from "../../components/SentBody/SentBody";

// material-UI_tabs functionalities
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function HomePage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <NavBar />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="INBOX" {...a11yProps(0)} />
            <Tab label="SENT" {...a11yProps(1)} />
            <Tab label="COMPOSE" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Container maxWidth="lg">
            <InboxBody /> 
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Container maxWidth="lg">
            <SendBody />
          </Container>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Container maxWidth="lg">
            <ComposeMessage />
          </Container>
        </TabPanel>
      </Box>
    </div>
  );
}

export default HomePage;
