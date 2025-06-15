import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Alert } from "@mui/material";
import { validateLoginForm } from "../../../utils/validateLoginForm";

const LoginModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isErrors = validateLoginForm(formData);
    if (Object.keys(isErrors).length === 0) {
      if (
        formData.email === "demo@admin.com" &&
        formData.password === "Admin@123"
      ) {
        localStorage.setItem("isAdminAuthenticated", "true");
        onClose();
        setErrors({});
        navigate("/admin/bookings");
      } else {
        setErrors({ submit: "Invalid credentials" });
      }
    } else {
      setErrors(isErrors);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, textAlign: "center" }}>Admin Login</DialogTitle>
      {errors?.submit && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {errors?.submit}
        </Alert>
      )}
      <DialogContent sx={{ pb: 2 }}>
        <Box component="form">
          <TextField
            margin="dense"
            required
            fullWidth
            label="Email"
            type="email"
            size="small"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) {
                setErrors({ ...errors, email: null });
              }
            }}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            label="Password"
            type="password"
            size="small"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) {
                setErrors({ ...errors, password: null });
              }
            }}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              color: "grey",
              mt: 2,
            }}
          >
            <span style={{ fontSize: 10 }}>Demo Credentials</span>
            <span>demo@admin.com</span>
            <span>Admin@123</span>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          sx={{ minWidth: "120px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="small"
          sx={{ minWidth: "120px" }}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
