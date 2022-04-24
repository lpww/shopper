import { gql } from "graphql-request";

export default gql`
  mutation UpdateUser(
    $name: String!
    $description: String
    $quantity: Int
    $completed: Boolean
  ) {
    updateUser(
      item: {
        name: $name
        description: $description
        quantity: $quantity
        completed: $completed
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
