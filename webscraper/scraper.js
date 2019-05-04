// a file to scrape a faculty courses assignments into a csv file


module.exports = async function (zoom, lat, long) {
  // zoom, lat, long
  // return {message:"test"};

  // return new Promise((resolve, reject) => {
  // doesnt work
  // return {message:"test"};
  // doesnt work
  // return Promise.resolve({message:"test"});
  // works
  // return resolve({message:"test"});

  const puppeteer = require('puppeteer');
  const MAINCONFIG = require('./config/mainconfig.js');
  const CREDS = require('./config/creds.js');
  // let promise = new Promise((resolve, reject) => {
  var startTime, endTime;
  startTime = new Date();
  /** return time elapsed */
  function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds 
    var seconds = Math.round(timeDiff);
    // console.log(seconds + " seconds");
    return "- in " + seconds + " seconds";
  }
  // return {message:"test"};

  // async function run() {
  var scrape = {
    status: 200
  }

  const browser = await puppeteer.launch({
    headless: MAINCONFIG.headless,
    args: ['--start-fullscreen', "--window-position=0,0"]
  });

  // return {message:"test"};

  try {




    const page = await browser.newPage();

    // await page.screenshot({ path: 'screenshots/github.png' });

    await page.goto(MAINCONFIG.mapUrl + "#" + zoom + "/" + lat + "/" + long);


    var screenShot = (new Date()).toLocaleTimeString().replace(/:/g, '_');;

    console.log(screenShot)

    var mapPath = "maps/"

    await page.screenshot({ path: mapPath + screenShot + '.png' });

    var fs = require('fs');

    // const sharp = require('sharp')

    // function resize(path, format, width, height) {
    //   const readStream = fs.createReadStream(path)
    //   let transform = sharp()

    //   if (format) {
    //     transform = transform.toFormat(format)
    //   }

    //   if (width || height) {
    //     transform = transform.resize(width, height)
    //   }

    // need to save after resizing
    //   return readStream.pipe(transform)
    // }


    // function to encode file data to base64 encoded string
    function base64_encode(file) {
      // read binary data
      var bitmap = fs.readFileSync(file);
      // convert binary data to base64 encoded string
      return new Buffer(bitmap).toString('base64');
    }

    // function to create file from base64 encoded string
    function base64_decode(base64str, file) {
      // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
      var bitmap = new Buffer(base64str, 'base64');
      // write buffer to file
      fs.writeFileSync(file, bitmap);
      console.log('******** File created from base64 encoded string ********');
    }

    // resize(mapPath + screenShot + '.png', 'png', 400, 400)

    // convert image to base64 encoded string
    var base64str = base64_encode(mapPath + screenShot + '.png');

    // this deletes the files after saving the base64
    fs.unlinkSync(mapPath + screenShot + '.png')

    // console.log(base64str);

    // return in rest api



    console.log("finished" + end())

    // export final results to input/assignments_template

    // if (MAINCONFIG.closeBrowser)
    browser.close();
    scrape.base64str = base64str
    // return base64str;
  } catch (error) {
    console.log("failed")
    console.log(error)
    scrape.status = 500
    scrape.error = error;
    console.log(scrape)
    browser.close();
  }

  endTime = new Date();
  var timeElapsed = endTime - startTime; //in ms
  timeElapsed /= 1000;
  scrape.timeElapsed = timeElapsed;
  console.log("resolving")
  // return { message: "scrape" };
  console.log(scrape.status)
  // return {message:"test"};

  return scrape
  // return Promise.resolve(scrape);
  // resolve(scrape);
  // }



  // await run();
  // })
}

// module.exports.scraper = scraper