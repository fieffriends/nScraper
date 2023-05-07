const scraperObject = {
	url: 'https://nhentai.net/favorites/',
	async scraper(browser) {
		let page = await browser.newPage();
		await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0');
		console.log(`Navigating to ${this.url}...`);
		const cookie = {
			'name': 'sessionid',
			'value': process.env.sessionid,
			'domain': 'nhentai.net',
			"path": "/"
		};
		await page.setCookie(cookie);
		await page.goto(this.url);
		//console.log(JSON.stringify(await page.cookies()));

		//Creates array of all favorite links
		let scrapedData = [];

		async function scrapeCurrentPage() {
			await page.waitForTimeout(5000);

			let items = await page.$$eval('div > div', item => {
				let all = [];
				let sample = { 'link': null , 'image': null, 'name': null};
				links = item.map(el => el.querySelector('div > a').href);
				for(link in links) {
					let copy = sample;
					copy.link = link;
					all.push(copy);
				}
				image = item.map(el => el.querySelector('div > a > img').src);
				title = item.map(el => el.querySelector('div > a > div').innerHTML);
				return all;
			});
			//await page.screenshot({ path: 'yooo.png', fullPage: true });
			//console.log(urls);

			//Adds all the links of this page
			scrapedData = scrapedData.concat(items);

			//See if there are more pages
			try {
				await page.$eval('.next', a => a.textContent);
				console.log("yay");
				await page.click('.next');
				return scrapeCurrentPage();
			} catch (err) {
				console.log("grrr");
			}
			await page.close();
			return scrapedData;
		}

		let data = await scrapeCurrentPage();
		console.log(data);
	}

}

module.exports = scraperObject;
