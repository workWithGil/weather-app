const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Application",
    name: "Gil Baxter",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me...",
    name: "Gil Baxter",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page...",
    name: "Gil Baxter",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({ error: "You must enter an address." });
  } else {
    geocode(
      req.query.address,
      (error, { location, longitude, latitude } = {}) => {
        if (error) {
          return res.send({ error });
        }

        weather(latitude, longitude, (error, weatherData) => {
          if (error) {
            return req.send({ error });
          }

          res.send({
            location: location,
            weatherData: weatherData,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send("You must have a search term.");
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    message: "Help File Not Found...",
    name: "G. Baxter",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "404 - Page Not Found...",
    name: "Gil Baxter",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
