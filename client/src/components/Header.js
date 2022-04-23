import DosisTypography from "./DosisTypography";
import { styled } from "@mui/material/styles";

const Title = styled(DosisTypography)`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
`;

const Layout = styled("div")`
  height: 60px;
  background: ${(props) => props.theme.palette.primary.dark};
  display: flex;
  align-items: center;
  padding-left: 2em;
`;

const Header = () => (
  <Layout>
    <Title variant="h6">Shopping List</Title>
  </Layout>
);

export default Header;
