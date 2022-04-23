import DosisTypography from "./DosisTypography";
import styled from "@mui/material/styles/styled";

const Title = styled(DosisTypography)`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
`;

const Layout = styled("div")`
  height: ${(props) => props.theme.spacing(8)};
  background: ${(props) => props.theme.palette.primary.dark};
  display: flex;
  align-items: center;
  padding-left: ${(props) => props.theme.spacing(4)};
`;

const Header = () => (
  <Layout>
    <Title variant="h6">Shopping List</Title>
  </Layout>
);

export default Header;
