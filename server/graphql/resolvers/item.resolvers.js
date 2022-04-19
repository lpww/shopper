const items = async (parent, args, context) => {
  const result = await context.app.pg.query(
    "SELECT * FROM items WHERE deleted = false"
  );
  return result.rows;
};

module.exports = {
  Query: { items },
};
