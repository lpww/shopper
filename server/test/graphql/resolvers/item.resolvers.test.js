"use strict";

const { test } = require("tap");

const {
  Query,
  Mutation,
} = require("../../../graphql/resolvers/item.resolvers");

const result = {
  rows: [
    {
      id: 1,
      name: "bacon",
      description: "smoked",
      quantity: 5,
      completed: false,
    },
  ],
};

test("item.resolvers", async (t) => {
  let queryText;
  let queryValues;

  const queryMock = (text, values) => {
    queryText = text;
    queryValues = values;
    return result;
  };

  const parent = {};
  const context = { app: { pg: { query: queryMock } } };

  t.afterEach(() => {
    queryText = null;
    queryValues = null;
  });

  test("Query.getItems", async (t) => {
    const args = {};

    const items = await Query.getItems(parent, args, context);
    t.equal(items, result.rows);
    t.equal(
      queryText,
      "SELECT id, name, description, quantity, completed FROM items WHERE deleted = false",
    );
  });

  test("Mutation.deleteItem", async (t) => {
    const args = { item: { id: 1 } };

    const { item } = await Mutation.deleteItem(parent, args, context);
    t.equal(item, result.rows[0]);

    t.equal(
      queryText,
      "UPDATE items SET deleted = true WHERE id = $1 RETURNING id, name",
    );

    const [id] = queryValues;
    t.equal(id, args.item.id);
  });

  test("Mutation.updateItem with default completed value", async (t) => {
    const args = {
      item: { id: 1, name: "new name", description: "new desc", quantity: 4 },
    };

    const { item } = await Mutation.updateItem(parent, args, context);
    t.equal(item, result.rows[0]);

    t.equal(
      queryText,
      "UPDATE items SET name = $1, description = $2, quantity = $3, completed = $4 WHERE id = $5 RETURNING id, name, description, quantity, completed",
    );

    const [name, description, quantity, completed, id] = queryValues;
    t.equal(name, args.item.name);
    t.equal(description, args.item.description);
    t.equal(quantity, args.item.quantity);
    t.equal(completed, false);
    t.equal(id, args.item.id);
  });

  test("Mutation.updateItem with set completed value", async (t) => {
    const args = {
      item: {
        id: 1,
        name: "new name",
        description: "new desc",
        quantity: 4,
        completed: true,
      },
    };

    const { item } = await Mutation.updateItem(parent, args, context);
    t.equal(item, result.rows[0]);

    t.equal(
      queryText,
      "UPDATE items SET name = $1, description = $2, quantity = $3, completed = $4 WHERE id = $5 RETURNING id, name, description, quantity, completed",
    );

    const [name, description, quantity, completed, id] = queryValues;
    t.equal(name, args.item.name);
    t.equal(description, args.item.description);
    t.equal(quantity, args.item.quantity);
    t.equal(completed, false);
    t.equal(id, args.item.id);
  });

  test("Mutation.addItem", async (t) => {
    const args = {
      item: { name: "new name", description: "new desc", quantity: 4 },
    };

    const { item } = await Mutation.addItem(parent, args, context);
    t.equal(item, result.rows[0]);

    t.equal(
      queryText,
      "INSERT INTO items(name, description, quantity) VALUES ($1, $2, $3) RETURNING id, name, description, quantity, completed",
    );

    const [name, description, quantity] = queryValues;
    t.equal(name, args.item.name);
    t.equal(description, args.item.description);
    t.equal(quantity, args.item.quantity);
  });
});
