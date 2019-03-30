const path = require('path');

describe('index page', () => {
	let page;

	beforeAll(async () => {
		page = await __BROWSER__.newPage();
		await page.goto('https://ranger.coordinate.work');
	}, 5000);

	afterAll(async () => {
		await page.close();
	});

	it(
		'should load the index page',
		async () => {
			const text = await page.evaluate(() => document.body.textContent);
			expect(text).toContain('Ranger');

			await page.screenshot({
				fullPage: true,
				path: `${path.resolve(__dirname, '..', '..', 'results')}/index.png`,
			});
		},
		5000,
	);
});
