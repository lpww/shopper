import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "graphql-hooks";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import styled from "@mui/material/styles/styled";

import Button from "components/atoms/Button";
import DosisTypography from "components/atoms/DosisTypography";
import NunitoTypography from "components/atoms/NunitoTypography";

import addItemQuery from "queries/addItem";

const Header = styled(DialogTitle)`
  background-color: ${(props) => props.theme.palette.grey["100"]};
  border: 1px solid ${(props) => props.theme.palette.grey["300"]};
`;

const Footer = styled("div")`
  background-color: ${(props) => props.theme.palette.primary.main};
  height: ${(props) => props.theme.spacing(0.75)};
`;

const HeaderTypography = styled(DosisTypography)`
  text-transform: uppercase;
  font-weight: 600;
`;

const TitleTypography = styled(NunitoTypography)`
  margin-top: ${(props) => props.theme.spacing(4)};
`;

const Input = styled(TextField)`
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const quantities = [1, 2, 3];

const validationSchema = yup.object({
  name: yup.string("Name").required("Name is required"),
  description: yup
    .string("Description")
    .max(100, "description should be a maximum of 100 characters"),
  quantity: yup.number("Quantity"),
});

const AddItemDialog = ({ onClose, isOpen, onSubmit }) => {
  const [addItem] = useMutation(addItemQuery);

  const formik = useFormik({
    initialValues: { name: "", description: "", quantity: 1 },
    validationSchema,
    onSubmit: async (variables) => {
      formik.resetForm();
      try {
        const queryVariables = { variables };
        const { data } = await addItem(queryVariables);
        onSubmit && onSubmit(data);
      } catch (e) {
        console.error("There was an error submitting the form:", e);
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Header>
        <HeaderTypography component="span" variant="h6">
          Shopping List
        </HeaderTypography>
      </Header>
      <DialogContent>
        <TitleTypography variant="subtitle1">Add an Item</TitleTypography>
        <NunitoTypography
          color="text.secondary"
          fontWeight="400"
          variant="subtitle2"
        >
          Add your new item below
        </NunitoTypography>
        <form onSubmit={formik.handleSubmit}>
          <Input
            color="action"
            fullWidth
            size="small"
            id="name"
            name="name"
            type="text"
            label="Item Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Input
            color="action"
            fullWidth
            size="small"
            multiline
            minRows={4}
            id="description"
            name="description"
            type="text"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <Input
            color="action"
            fullWidth
            select
            size="small"
            id="quantity"
            name="quantity"
            type="number"
            label="How many?"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          >
            {quantities.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Input>
          <DialogActions sx={{ marginTop: 32 }}>
            <Button
              onClick={() => {
                formik.resetForm();
                onClose();
              }}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </DialogActions>
        </form>
      </DialogContent>
      <Footer />
    </Dialog>
  );
};

export default AddItemDialog;
