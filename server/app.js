const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const fs = require("fs")
const cors = require("cors");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: "false" }));



app.get("/cars", (req, res) =>{
    res.send(fs.readFileSync("./cars.json", {encoding: "utf-8"}));
});

app.post("/cars", (req, res) =>{
    const carsArray = JSON.parse(fs.readFileSync("./cars.json", {encoding: "utf-8"}))
    fs.writeFileSync("./cars.json", JSON.stringify([...carsArray, {id: carsArray.at(-1)?.id + 1 || 1, model: req.body.model}]));
    res.send("cars added");
});

app.put("/cars", (req, res) =>{
    const {id, model} = req.body
    let carsArray = JSON.parse(fs.readFileSync("./cars.json", {encoding: "utf-8"}))
    carsIndex = carsArray.findIndex(item => item.id === +id)
    carsArray[carsIndex].model = model
    fs.writeFileSync("./cars.json", JSON.stringify(carsArray));
    res.send("cars changed");
});

app.delete("/cars/:id", (req, res) =>{
    const id = +req.params.id
    const carsArray = JSON.parse(fs.readFileSync("./cars.json", {encoding: "utf-8"}))
    const newArrray = carsArray.filter(item => item.id !== +id)
    fs.writeFileSync("./cars.json", JSON.stringify(newArrray));
    res.send("cars deleted");
});


app.listen(8080);
