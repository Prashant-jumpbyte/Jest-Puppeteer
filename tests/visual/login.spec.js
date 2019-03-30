const path = require('path');
const timeout = 50000

describe('/ (Login)', () => {
  let page
  beforeAll(async () => {
    page = await global.__BROWSER__.newPage()
    await page.setViewport({
      width: 1920,
      height: 1080
    });
    await page.goto('https://ranger.coordinate.work', {
      waitUntil: 'networkidle2'
    })
    await page.evaluate('document.documentElement.webkitRequestFullscreen()');
  }, timeout)

  afterAll(async () => {
    await page.close()
  })

  it('Login Step Fail', async () => {

    let emailtxt = await page.$("input[name=email]");
    await emailtxt.click({
      clickCount: 3
    })
    await emailtxt.type('10001', {
      delay: 10
    });

    let passwordtxt = await page.$("input[name=password]");
    await passwordtxt.click({
      clickCount: 3
    })

    await passwordtxt.type('123456', {
      delay: 10
    });

    let submitbtn = await page.$("button[type='submit']");
    await submitbtn.click();

    await page.waitForSelector("p[class='ng-binding']");
    let lblerror = await page.$eval("p[class='ng-binding']", e => e.innerText);
    try {
      console.log(lblerror);
      await expect(lblerror).toBe('Invalid username/password combination');
    } catch (err) {
      await page.screenshot({
        fullPage: true,
        path: `${path.resolve(__dirname, '..', '..', 'results')}/Login-test-1.png`,
      });
    }
  }, timeout)

  it('Login Step Success', async () => {
    let emailtxt = await page.$("input[name=email]");
    await emailtxt.click({
      clickCount: 3
    })
    await emailtxt.type('1000', {
      delay: 10
    });

    let passwordtxt = await page.$("input[name=password]");
    await passwordtxt.click({
      clickCount: 3
    })

    await passwordtxt.type('123456', {
      delay: 10
    });

    let submitbtn = await page.$("button[type='submit']");

    await submitbtn.click();
    page.waitForNavigation({
      waitUntil: 'networkidle0'
    });
    await page.waitFor(1000);
    const url = await page.evaluate(() => location.href);

    try {
      console.log(url);
      await expect(url).toEqual("https://ranger.coordinate.work/app/home");
    } catch (err) {
      await page.screenshot({
        fullPage: true,
        path: `${path.resolve(__dirname, '..', '..', 'results')}/Login-test-2.png`,
      });
    }
  }, timeout)
})