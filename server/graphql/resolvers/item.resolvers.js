const addItem = async (parent, args, context) => {
  const result = await context.app.pg.query(
    "INSERT INTO items(name, description, quantity) VALUES ($1, $2, $3) RETURNING id, name, description, quantity, completed",
    [args.item.name, args.item.description, args.item.quantity]
  );
  return { item: result.rows[0] };
};

const updateItem = async (parent, args, context) => {
  const result = await context.app.pg.query(
    "UPDATE items SET name = $1, description = $2, quantity = $3, completed = $4 WHERE id = $5 RETURNING id, name, description, quantity, completed",
    [
      args.item.name,
      args.item.description,
      args.item.quantity,
      args.item.completed ?? false,
      args.item.id,
    ]
  );
  return { item: result.rows[0] };
};

const deleteItem = async (parent, args, context) => {
  const result = await context.app.pg.query(
    "UPDATE items SET deleted = true WHERE id = $1 RETURNING id, name",
    [args.item.id]
  );
  return { item: result.rows[0] };
};

const getItems = async (parent, args, context) => {
  const result = await context.app.pg.query(
    "SELECT id, name, description, quantity, completed FROM items WHERE deleted = false"
  );
  return result.rows;
};

module.exports = {
  Query: { getItems },
  Mutation: { addItem, updateItem, deleteItem },
};
