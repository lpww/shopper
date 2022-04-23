import { gql } from "graphql-request";

export default gql`
  query {
    getItems {
      id
      name
      description
      quantity
      completed
    }
  }
`;
