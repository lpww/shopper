import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@mui/material/styles/styled";

const Layout = styled("div")`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(1)};
`;

const Spinner = styled(CircularProgress)`
  color: ${(props) => props.theme.palette.primary.dark};
`;

const LoadingSpinner = () => {
  return (
    <Layout>
      <Spinner size="72px" thickness={1.5} />
    </Layout>
  );
};

export default LoadingSpinner;
