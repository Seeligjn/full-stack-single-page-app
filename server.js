import express from "express";
import pg from "pg";
import dotenv from "dotenv";

const server = express();
const PORT = 4000;

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

server.use(express.static("public"));
server.use(express.json());
//get all realtors
server.get("/api/realtors", (req, res) => {
  db.query("SELECT * FROM realtors", []).then((result) => {
    res.send(result.rows);
  });
});

//get all properties
server.get("/api/properties", (req, res) => {
  db.query("SELECT * FROM properties", []).then((result) => {
    res.send(result.rows);
  });
});

//post to realtors
server.post("/api/realtors", (req, res) => {
  const { name, age } = req.body;
  db.query("INSERT INTO realtors (name , age) VALUES ($1, $2) RETURNING *", [
    name,
    age,
  ]).then((result) => {
    res.send(result.rows);
  });
});

//post to properties
server.post("/api/PROPERTIES", (req, res) => {
  const { name, for_sale, realtor_id } = req.body;
  db.query(
    "INSERT INTO PROPERTIES (name , for_sale , realtor_id) VALUES ($1, $2, $3) RETURNING *",
    [name, for_sale, realtor_id]
  ).then((result) => {
    res.send(result.rows);
  });
});

//patch realtors by ID
server.patch("/api/realtors/:id", (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  db.query(
    "UPDATE realtors SET name = COALESCE($1,name), age = COALESCE($2, age) WHERE id = $3 RETURNING *",
    [name, age, id]
  ).then((result) => {
    res.send(result.rows);
  });
});

//patch properties by ID
server.patch("/api/properties/:id", (req, res) => {
  const id = req.params.id;
  const { name, for_sale, realtor_id } = req.body;
  db.query(
    "UPDATE properties SET name = COALESCE($1,name), for_sale = COALESCE($2, for_sale) , realtor_id = COALESCE($3, realtor_id) WHERE id = $4 RETURNING *",
    [name, for_sale, realtor_id, id]
  ).then((result) => {
    res.send(result.rows);
  });
});

//delete from realtors by ID
server.delete("/api/realtors/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM realtors WHERE id = $1 RETURNING *", [id]).then(
    (result) => {
      res.send(result.rows);
    }
  );
});

//delete from properties by ID
server.delete("/api/properties/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM properties WHERE id = $1 RETURNING *", [id]).then(
    (result) => {
      res.send(result.rows);
    }
  );
});

server.listen(PORT, () => {
  console.log(`Listening On Port ${PORT}...`);
});
