const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
    fs.readFile("visits.log", "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Could not read logs" });
        res.json({ logs: data.split("\n").filter(Boolean) });
    });
});


router.post("/msg", (req, res, next) => {
    const message = req.body.message;
    res.json({"receivedMessage": message});
});

class Message {
    constructor(content) {
      this.content = content;
    }
   
    getContent() {
      return this.content;
    }
}

app.post("/msg", (req, res, next) => {
    const newMessage = new Message(req.body.message);
    res.json({"receivedMessage": newMessage.getContent()});
});


module.exports = router;
