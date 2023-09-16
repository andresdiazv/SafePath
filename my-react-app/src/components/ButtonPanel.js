import React, { useState } from "react";
import {
  Button,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const ButtonPanel = () => {
  const [open, setOpen] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [result, setResult] = useState(null);
  const [selectedScans, setSelectedScans] = useState({
    nmap: false,
    nuclei: false,
  });

  const handleScan = () => {
    console.log("Scanning IP:", ipAddress);
    console.log("Selected Scans:", selectedScans);
    fetch("/api/light-scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ip: ipAddress, selectedScans }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setResult(JSON.stringify(data, null, 2));
        }
      })
      .catch((err) => {
        console.error("Error during scan:", err);
        alert("Error occurred during the scan. Please try again.");
      });
    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setSelectedScans({
      ...selectedScans,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "10vh" }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{
            margin: "10px",
            width: "500px",
            height: "100px",
            fontFamily: "Minecraft",
          }}
          onClick={handleClickOpen}
        >
          Start Scan
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontFamily: "Minecraft" }}>
          Enter IP Address
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontFamily: "Minecraft" }}>
            Please enter the IP address you want to scan.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="IP Address"
            type="text"
            fullWidth
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedScans.nmap}
                onChange={handleCheckboxChange}
                name="nmap"
                color="primary"
              />
            }
            label="Nmap"
            style={{ fontFamily: "Minecraft" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedScans.nuclei}
                onChange={handleCheckboxChange}
                name="nuclei"
                color="primary"
              />
            }
            label="Nuclei"
            style={{ fontFamily: "Minecraft" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ fontFamily: "Minecraft" }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleScan}
            color="primary"
            style={{ fontFamily: "Minecraft" }}
          >
            Start Scan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display scan results if available */}
      {result && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h3>Scan Results:</h3>
          <p>{result}</p>
        </div>
      )}
    </Container>
  );
};

export default ButtonPanel;
