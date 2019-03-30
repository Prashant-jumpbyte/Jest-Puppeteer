const path = require('path');
const timeout = 50000

describe('/ (Logout)', () => {
    let page
    beforeAll(async () => {
        page = await global.__BROWSER__.newPage()
        // await page.setViewport({
        //     width: 1920,
        //     height: 1080
        // });
        await page.goto('https://ranger.coordinate.work', {
            waitUntil: 'networkidle2'
        })
        await page.evaluate('document.documentElement.webkitRequestFullscreen()');
    }, timeout)

    afterAll(async () => {
        await page.close()
    })

    it('Logout successfully'), async () => {
        const puppeteer = require('puppeteer');
        (async () => {
            await page.waitForSelector('.container-fluid > #bs-example-navbar-collapse-1 > .nav > .dropdown > .ng-binding')
            await page.click('.container-fluid > #bs-example-navbar-collapse-1 > .nav > .dropdown > .ng-binding')

            await page.waitForSelector('.navbar-right > .open > .dropdown-menu > li:nth-child(21) > .ng-binding')
            await page.click('.navbar-right > .open > .dropdown-menu > li:nth-child(21) > .ng-binding')
            page.waitForNavigation({
                waitUntil: 'networkidle0'
            });
            await page.waitFor(1000);
            const url = await page.evaluate(() => location.href);
            try {
                await expect(url).toEqual("https://ranger.coordinate.work/login")
            } catch (err) {
                page.screenshot({
                    fullPage: true,
                    path: `${path.resolve(__dirname, '..', '..', 'results')}/Logout-test-1.png`,
                });
            }
        })()
    }
}, timeout)