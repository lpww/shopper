import Button from "@mui/material/Button";
import Typography from "components/NunitoTypography";

const SubmitButton = ({ children, ...props }) => {
  return (
    <Button color="secondary" size="small" variant="contained" {...props}>
      <Typography
        fontWeight="500"
        p={0.5}
        textTransform="none"
        variant="caption"
      >
        {children}
      </Typography>
    </Button>
  );
};

export default SubmitButton;
