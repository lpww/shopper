import React from "react";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import memCache from "graphql-hooks-memcache";

const client = new GraphQLClient({
  url: `${process.env.REACT_APP_SHOPPER_API_DOMAIN}/graphql`,
  cache: memCache(),
});

const GraphQLProvider = ({ children }) => {
  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
};

export default GraphQLProvider;
