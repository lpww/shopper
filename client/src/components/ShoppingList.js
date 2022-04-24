import { useState } from "react";
import { useQuery } from "graphql-hooks";

import styled from "@mui/material/styles/styled";

import AddItemDialog from "components/AddItemDialog";
import UpdateItemDialog from "components/UpdateItemDialog";
import FlexColumn from "components/FlexColumn";
import FlexRow from "components/FlexRow";
import LoadingSpinner from "components/LoadingSpinner";
import ShoppingListItem from "components/ShoppingListItem";
import Button from "components/Button";
import Typography from "components/NunitoTypography";

import getItemsQuery from "queries/getItems";

const Layout = styled("div")`
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => props.theme.spacing(6)};
  margin: auto;
  max-width: ${(props) => props.theme.spacing(100)};
  width: 100%;
`;

const EmptyList = styled(FlexColumn)`
  align-items: center;
  border: 1px solid ${(props) => props.theme.palette.grey["200"]};
  margin-top: ${(props) => props.theme.spacing(6)};
`;

const ShoppingList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data, loading, error } = useQuery(getItemsQuery);

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
    return (
      <>
        <AddItemDialog
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
        <Layout>
          <EmptyList>
            <Typography mt={15} mb={1}>
              Your shopping list is empty :(
            </Typography>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              sx={{ marginBottom: 15, marginTop: 1 }}
            >
              <Typography
                fontWeight="500"
                p={0.5}
                textTransform="none"
                variant="caption"
              >
                Add your first item
              </Typography>
            </Button>
          </EmptyList>
        </Layout>
      </>
    );
  }

  return (
    <>
      <AddItemDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <UpdateItemDialog
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={() => {
          setIsUpdateModalOpen(false);
          setEditingItem(null);
        }}
        item={editingItem}
      />
      <Layout>
        <FlexRow sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">Your Items</Typography>
          <Button onClick={() => setIsAddModalOpen(true)}>Add item</Button>
        </FlexRow>
        {data.getItems.map((item) => {
          return (
            <ShoppingListItem
              key={item.id}
              onEdit={(item) => {
                setEditingItem(item);
                setIsUpdateModalOpen(true);
              }}
              item={item}
            />
          );
        })}
      </Layout>
    </>
  );
};

export default ShoppingList;
