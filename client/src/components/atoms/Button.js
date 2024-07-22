import MuiButton from "@mui/material/Button";
import Typography from "components/atoms/NunitoTypography";

const Button = ({ children, ...props }) => {
  return (
    <MuiButton color="secondary" size="small" variant="contained" {...props}>
      <Typography
        fontWeight="500"
        p={0.5}
        textTransform="none"
        variant="caption"
      >
        {children}
      </Typography>
    </MuiButton>
  );
};

export default Button;
