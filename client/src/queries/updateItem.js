import { gql } from "graphql-request";

export default gql`
  mutation UpdateItem(
    $name: String!
    $description: String!
    $quantity: Int!
    $completed: Boolean!
    $id: Int!
  ) {
    updateItem(
      item: {
        name: $name
        description: $description
        quantity: $quantity
        completed: $completed
        id: $id
      }
    ) {
      item {
        id
        name
        description
        quantity
        completed
      }
    }
  }
`;
