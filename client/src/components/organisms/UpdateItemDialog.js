import * as yup from "yup";
import { useEffect } from "react";
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

import updateItemQuery from "queries/updateItem";

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
const initialValues = {
  name: "",
  description: "",
  quantity: 1,
  completed: false,
};

const validationSchema = yup.object({
  name: yup.string("Name").required("Name is required"),
  description: yup
    .string("Description")
    .max(100, "description should be a maximum of 100 characters"),
  quantity: yup.number("Quantity"),
});

const UpdateItemDialog = ({ item, onClose, isOpen, onSubmit }) => {
  const [updateItem] = useMutation(updateItemQuery);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (variables) => {
      try {
        const queryVariables = { variables: { ...variables, id: item.id } };
        const { data } = await updateItem(queryVariables);
        onSubmit && onSubmit(data);
      } catch (e) {
        console.error("There was an error submitting the form:", e);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name: item?.name ?? "",
      description: item?.description ?? "",
      quantity: item?.quantity ?? 1,
      completed: item?.completed ?? false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Header>
        <HeaderTypography component="span" variant="h6">
          Shopping List
        </HeaderTypography>
      </Header>
      <DialogContent>
        <TitleTypography variant="subtitle1">Edit an Item</TitleTypography>
        <NunitoTypography
          color="text.secondary"
          fontWeight="400"
          variant="subtitle2"
        >
          Edit your item below
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
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button type="submit">Save Item</Button>
          </DialogActions>
        </form>
      </DialogContent>
      <Footer />
    </Dialog>
  );
};

export default UpdateItemDialog;
