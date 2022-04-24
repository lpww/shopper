import { useQuery } from "graphql-hooks";

import Button from "@mui/material/Button";

import styled from "@mui/material/styles/styled";

import FlexRow from "components/FlexRow";
import LoadingSpinner from "components/LoadingSpinner";
import ShoppingListItem from "components/ShoppingListItem";
import Typography from "components/NunitoTypography";

import getItems from "queries/getItems";

const Layout = styled("div")`
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => props.theme.spacing(6)};
  margin: auto;
  max-width: ${(props) => props.theme.spacing(100)};
  width: 100%;
`;

const ShoppingList = () => {
  const { data, loading, error } = useQuery(getItems);

  if (error) {
    alert("There was an error processing the request");
  }

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (!data?.getItems?.length) {
    return null; // todo: add empty page here
  }

  return (
    <Layout>
      <FlexRow sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6">Your Items</Typography>
        <Button
          color="secondary"
          onClick={() => alert("add")}
          size="small"
          variant="contained"
        >
          <Typography
            fontWeight="500"
            p={0.5}
            textTransform="none"
            variant="caption"
          >
            Add Item
          </Typography>
        </Button>
      </FlexRow>
      {data.getItems.map((item) => {
        return <ShoppingListItem key={item.id} {...item} />;
      })}
    </Layout>
  );
};

export default ShoppingList;
