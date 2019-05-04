var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server running on port http://localhost:3000");
});

app.get("/scrape", (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

// console.log('todo list RESTful API server started on: ' + port);
