const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { users } = require("./data.js");
const productsData = require("./product.json");
const commentsData = require("./comments.json");
const mybagData = require("./mybag.json");
let port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/products", async function (req, res, next) {
  const category = req.query.category;

  if (req.query.category != null) {
    const products = productsData.filter((categ) => {
      return categ.category == req.query.category;
    });
    return res.send(products);
  }
  res.send(productsData);
});

app.get("/comments", (req, res) => {
  res.send(commentsData);
});
app.get("/mybag", (req, res) => {
  res.send(mybagData);
});

app.post("/api/register", (req, res) => {
  const { fullname, email, phone, password } = req.body;

  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "This email already exists" });
  }
  if (
    fullname === undefined ||
    email === undefined ||
    phone === undefined ||
    password === undefined
  ) {
    return res.status(401).json({ message: "enter Your Full Info" });
  }

  const newUser = { fullname, email, phone, password };
  users.push(newUser);
  res.json({ message: "Registration successful" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  let userpassword = users.find((u) => u.password === password);
  let useremail = users.find((u) => u.email === email);

  if (!useremail) {
    return res.status(402).json({ message: "Email Doesn't Exist" });
  }
  if (!userpassword) {
    return res.status(401).json({ message: "Incorrect Password" });
  }

  let token = jwt.sign({ email }, "nFj2!$9KpQa3ZmC5", { expiresIn: "1M" }); // Token expires in 1 hour
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
  console.log(`Register Api on   http://localhost:${port}/api/register`);
  console.log(`Login Api on   http://localhost:${port}/api/login`);

  console.log(`Products Api on  http://localhost:${port}/products`);
  console.log(`Comments Api on   http://localhost:${port}/comments`);
  console.log(`Mybag Api on   http://localhost:${port}/mybag`);
});
