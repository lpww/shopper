import { gql } from "graphql-request";

export default gql`
  mutation AddUser($name: String!, $description: String, $quantity: Int) {
    addItem(
      item: { name: $name, description: $description, quantity: $quantity }
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
