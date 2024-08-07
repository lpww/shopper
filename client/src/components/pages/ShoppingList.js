import { useState } from "react";
import { useMutation, useQuery } from "graphql-hooks";

import styled from "@mui/material/styles/styled";

import AddItemDialog from "components/organisms/AddItemDialog";
import UpdateItemDialog from "components/organisms/UpdateItemDialog";
import FlexColumn from "components/atoms/FlexColumn";
import FlexRow from "components/atoms/FlexRow";
import LoadingSpinner from "components/molecules/LoadingSpinner";
import ShoppingListItem from "components/organisms/ShoppingListItem";
import Button from "components/atoms/Button";
import Typography from "components/atoms/NunitoTypography";

import getItemsQuery from "queries/getItems";
import updateItemQuery from "queries/updateItem";
import deleteItemQuery from "queries/deleteItem";

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

  const { data, loading, error, refetch } = useQuery(getItemsQuery);
  const [updateItem] = useMutation(updateItemQuery);
  const [deleteItem] = useMutation(deleteItemQuery);

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
          onSubmit={() => {
            refetch();
            setIsAddModalOpen(false);
          }}
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
        onSubmit={() => {
          refetch();
          setIsAddModalOpen(false);
        }}
      />
      <UpdateItemDialog
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={() => {
          setIsUpdateModalOpen(false);
          setEditingItem(null);
          refetch();
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
              onComplete={async (item) => {
                try {
                  await updateItem({
                    variables: {
                      id: item.id,
                      name: item.name ?? "",
                      description: item.description ?? "",
                      quantity: item.quantity ?? 1,
                      completed: !item.completed,
                    },
                  });
                  refetch();
                } catch (e) {
                  console.error("There was an error updating the item", e);
                }
              }}
              onDelete={async (item) => {
                try {
                  await deleteItem({ variables: { id: item.id } });
                  refetch();
                } catch (e) {
                  console.error("There was an error deleting the item, e");
                }
              }}
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
