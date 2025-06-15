import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { validateBookSlotForm } from "../../../utils/validateBookSlotForm";

const BookSlotDialog = ({
  open,
  onClose,
  selectedSlot,
  formData,
  setFormData,
  loading,
  onSubmit,
}) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isErrors = validateBookSlotForm(formData);
    if (Object.keys(isErrors).length === 0) {
      onSubmit();
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
      <DialogTitle sx={{ pb: 1, textAlign: "center" }}>
        Book Your Slot
      </DialogTitle>
      <DialogContent sx={{ pb: 2 }}>
        <Box component="form">
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
            }}
          >
            <AccessTimeIcon color="primary" />
            <Typography variant="subtitle1">
              {selectedSlot?.startTime} - {selectedSlot?.endTime}
            </Typography>
          </Paper>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            size="small"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) {
                setErrors({ ...errors, name: null });
              }
            }}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
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
            required
          />
          <DialogActions
            sx={{ p: 2, display: "flex", justifyContent: "center" }}
          >
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
              disabled={loading}
              sx={{ minWidth: "120px" }}
            >
              {loading ? <CircularProgress size={20} /> : "Confirm Booking"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookSlotDialog;
