const addItem = async (parent, args, context) => {
  return context.app.pg.transact(async (client) => {
    const result = await client.query(
      "INSERT INTO items(name, description, quantity) VALUES ($1, $2, $3) RETURNING id",
      [args.item.name, args.item.description, args.item.quantity]
    );
    return result.rows[0];
  });
};

const items = async (parent, args, context) => {
  const result = await context.app.pg.query(
    "SELECT id, name, description, quantity, completed FROM items WHERE deleted = false"
  );
  return result.rows;
};

module.exports = {
  Query: { items },
  Mutation: { addItem },
};
