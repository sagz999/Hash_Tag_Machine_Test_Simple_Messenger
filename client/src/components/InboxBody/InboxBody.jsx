import * as React from "react";
import { Box, Button, Container } from "@mui/material";
import MessageTile from "../MessageTile/MessageTile";
import { useNavigate } from "react-router-dom";

export default function InboxBody() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: "25px" }}>
        <Button variant="contained" color="success" onClick={() => {
          navigate('/compose')
        }}>
          Compose
        </Button>
      </Box>
      <MessageTile />
    </Container>
  );
}
