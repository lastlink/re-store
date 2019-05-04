// a file to scrape a faculty courses assignments into a csv file
const puppeteer = require('puppeteer');
const MAINCONFIG = require('./config/mainconfig.js');
const CREDS = require('./config/creds.js');

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

async function run() {
  const browser = await puppeteer.launch({
    headless: MAINCONFIG.headless,
    args: ['--start-fullscreen', "--window-position=0,0"]
  });

  const page = await browser.newPage();

  // await page.screenshot({ path: 'screenshots/github.png' });

  await page.goto(MAINCONFIG.mapUrl);


  var screenShot = (new Date()).toLocaleTimeString().replace(/:/g, '_');;

  console.log(screenShot)

  var mapPath = "maps/"

  await page.screenshot({ path: mapPath + screenShot + '.png' });

  var fs = require('fs');



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

  // convert image to base64 encoded string
  var base64str = base64_encode(mapPath + screenShot + '.png');

  fs.unlinkSync(mapPath + screenShot + '.png')

  // console.log(base64str);

  // return in rest api



  console.log("finished" + end())

  // export final results to input/assignments_template

  // if (MAINCONFIG.closeBrowser)
  browser.close();
}



run();
