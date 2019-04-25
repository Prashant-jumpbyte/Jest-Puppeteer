const express = require('express');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
// let jestscreenshot = require('@jeeyah/jestscreenshot');

module.exports = async function () {
	// const app = express();
	// app.use(express.static('client/'));
	// global.__SERVER__ = app.listen(3000);
	var options = {
		headless: false,
		args: [
			'--disable-infobars',
			'--start-maximized',
		],
	}
	const browser = await puppeteer.launch(options)
	global.__BROWSER__ = browser;
	fs.writeFileSync(
		path.join(__dirname, '..', 'tmp', 'puppeteerEndpoint'),
		browser.wsEndpoint()
	);
		
	// global.it = async function (name, func) {
	// 	return await test(name, async () => {
	// 		try {
	// 			await func();
	// 		} catch (e) {
	// 			await fs.ensureDir('result/screenshots');
	// 			await page.screenshot({ path: `result/screenshots/${name}.png` });
	// 			throw e;
	// 		}
	// 	});
	// };
};