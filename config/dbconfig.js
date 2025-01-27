const { MongoClient } = require("mongodb");
const mongodb_url =
  "mongodb+srv://rinsacm:xKNzSeVRBiE6quwW@cluster0.h6ny9xy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(process.env);
const state = {
  db: null,
};

module.exports.connect = async () => {
  if (state.db) return done;
  const dbName = "kanban";
  const client = new MongoClient(mongodb_url);
  try {
    await client.connect();
    const dbs = client.db(dbName);
    state.db = dbs;

    await client.db(dbName).command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
};

module.exports.get = () => {
  return state.db;
};
