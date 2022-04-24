import { gql } from "graphql-request";

export default gql`
  mutation DeleteItem($id: Int!) {
    deleteItem(item: { id: $id }) {
      item {
        id
      }
    }
  }
`;
