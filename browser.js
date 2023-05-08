const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const {executablePath} = require('puppeteer');

async function startBrowser(){
	let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.connect({ browserWSEndpoint: 'wss://chrome.browserless.io?token=ff070955-1bf5-4b36-899d-212da94ca116' })
	    //browser = await puppeteer.launch({
	     //   headless: true,
         //   executablePath: executablePath(),
	   //     args: ["--disable-setuid-sandbox"],
	  //      'ignoreHTTPSErrors': true
	//    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
	startBrowser
};
