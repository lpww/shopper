import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import styled from "@mui/material/styles/styled";

import Button from "components/Button";
import DosisTypography from "components/DosisTypography";

const Typography = styled(DosisTypography)`
  text-transform: uppercase;
  font-weight: 600;
`;

const AddItemDialog = ({ onClose, isOpen }) => {
  const onSubmit = () => alert("submit");
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Typography component="span" variant="h6">
          Shopping List
        </Typography>
      </DialogTitle>
      <DialogContent>form goes here</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit}>Add Task</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
