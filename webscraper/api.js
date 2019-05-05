var express = require('express'),
    app = express(),
    port = process.env.PORT || 3333;

var morgan = require('morgan')
var path = require('path')
var rfs = require('rotating-file-stream')

// create a rotating write stream
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

var cors = require('cors');
// app.use(cors({
//     origin: 'http://yourapp.com'
//   }));
app.use(cors());

app.use(morgan('combined', { stream: accessLogStream }))

app.listen(port, () => {
    console.log("Server running on port http://localhost:" + port);
});

app.get("/", (req, res, next) => {
    res.send('Hello World!')
})

app.get("/scrape", async (req, res, next) => {
    var zoom = req.query.zoom,
        lat = req.query.lat,
        long = req.query.long;

    const { promisify } = require('util');
    // const scraper = promisify(require("./scraper"));
    const scraper = await require("./scraper");
    const test = await require("./testasync");


    var testrespon = await test();
    console.log(testrespon)


    // return scraper(zoom, lat, long).then((resp) =>{
    console.log("testings")
    var resp = await scraper(zoom, lat, long);
    // zoom, lat, long

    console.log("should have waited")
    if (resp && resp.status && !resp.base64Str)
        console.log(resp.status)

    console.log("returning response")
    var propValue;
    for (var propName in resp) {

        console.log(propName);
    }
    if (resp && !resp['base64str'])
        console.log(resp)

    if (!resp) {
        resp = {
            status: 404
        }
    }

    var response = {
        // people: ["Tony", "Lisa", "Michael", "Ginger"],
        status: resp.status,
        timeElapsed: resp['timeElapsed'],
        // req.query
        base64Str: resp['base64str']
    }

    if (resp.status)
        response.statusCode = 404;

    res.setHeader('Content-Type', 'application/json');
    res.json(response);
    // })

});

// console.log('todo list RESTful API server started on: ' + port);
