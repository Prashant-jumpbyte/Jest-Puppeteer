const path = require('path');
const timeout = 50000

describe('/ (Setting > User)', () => {
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

    // it('Login Step Success', async () => {
    //     let emailtxt = await page.$("input[name=email]");
    //     await emailtxt.click({
    //         clickCount: 3
    //     })
    //     await emailtxt.type('1000', {
    //         delay: 10
    //     });

    //     let passwordtxt = await page.$("input[name=password]");
    //     await passwordtxt.click({
    //         clickCount: 3
    //     })

    //     await passwordtxt.type('123456', {
    //         delay: 10
    //     });

    //     let submitbtn = await page.$("button[type='submit']");

    //     await submitbtn.click();
    //     page.waitForNavigation({
    //         waitUntil: 'networkidle0'
    //     });
    //     await page.waitFor(5000);
    //     const url = await page.evaluate(() => location.href);

    //     try {
    //         console.log(url);
    //         await expect(url).toEqual("https://ranger.coordinate.work/app/home");
    //     } catch (err) {
    //         await page.screenshot({
    //             fullPage: true,
    //             path: `${path.resolve(__dirname, '..', '..', 'results')}/Login-test-2.png`,
    //         });
    //     }
    // })

    it('Add valid user', async () => {

        await page.waitForSelector('.container-fluid > #bs-example-navbar-collapse-1 > .nav > .dropdown > .ng-binding')
        await page.click('.container-fluid > #bs-example-navbar-collapse-1 > .nav > .dropdown > .ng-binding')

        await page.waitForSelector('.dropdown > .dropdown-menu > .ng-scope:nth-child(5) > .ng-scope > .ng-scope')
        await page.click('.dropdown > .dropdown-menu > .ng-scope:nth-child(5) > .ng-scope > .ng-scope')

        await page.waitForSelector('.row > .col-sm-2 > .nav-stacked > li:nth-child(2) > .ng-scope')
        await page.click('.row > .col-sm-2 > .nav-stacked > li:nth-child(2) > .ng-scope')

        await page.waitForSelector('.col-sm-12 > .form-validate > .row > .col-sm-4 > #id')
        let txtId = await page.$('.col-sm-12 > .form-validate > .row > .col-sm-4 > #id');
        await txtId.click({
            clickCount: 3
        })
        await txtId.type('10001', {
            delay: 10
        });

        await page.waitForSelector('.col-sm-12 > .form-validate > .row > .col-sm-4 > #firstName')
        let txtFirstName = await page.$('.col-sm-12 > .form-validate > .row > .col-sm-4 > #firstName')
        await txtFirstName.click({
            clickCount: 3
        })
        await txtFirstName.type('Firstbot', {
            delay: 10
        });

        await page.waitForSelector('.col-sm-12 > .form-validate > .row > .col-sm-4 > #lastName')
        let txtLastName = await page.$('.col-sm-12 > .form-validate > .row > .col-sm-4 > #lastName')
        await txtLastName.click({
            clickCount: 3
        })
        await txtLastName.type('Lastbot', {
            delay: 10
        });

        await page.waitForSelector('.row > .form-group > .bootstrap-switch-id-supervisor > .bootstrap-switch-container > .bootstrap-switch-label')
        await page.click('.row > .form-group > .bootstrap-switch-id-supervisor > .bootstrap-switch-container > .bootstrap-switch-label')

        await page.waitForSelector('.row > .form-group > .bootstrap-switch-id-handheldUser > .bootstrap-switch-container > .bootstrap-switch-label')
        await page.click('.row > .form-group > .bootstrap-switch-id-handheldUser > .bootstrap-switch-container > .bootstrap-switch-label')

        await page.waitForSelector('.col-sm-6 > .form-group > .multi-select > .multiSelect > #multi-select-button')
        await page.click('.col-sm-6 > .form-group > .multi-select > .multiSelect > #multi-select-button')

        await page.waitForSelector('.checkboxLayer > .checkBoxContainer > .multiSelectItem:nth-child(4) > .acol > label')
        await page.click('.checkboxLayer > .checkBoxContainer > .multiSelectItem:nth-child(4) > .acol > label')

        await page.waitForSelector('.checkboxLayer > .checkBoxContainer > .multiSelectItem:nth-child(2) > .acol > label')
        await page.click('.checkboxLayer > .checkBoxContainer > .multiSelectItem:nth-child(2) > .acol > label')

        await page.select('.col-sm-12 > .form-validate > .row:nth-child(3) > .form-group > .form-control', 'string:SJ')

        await page.waitForSelector('.col-sm-12 > .form-validate > .row:nth-child(3) > .form-group > .form-control')
        await page.click('.col-sm-12 > .form-validate > .row:nth-child(3) > .form-group > .form-control')

        await page.waitForSelector('.col-sm-12 > .ng-valid-pattern > .ng-scope > .col-sm-6 > #userPass')
        let txtPassword = await page.$('.col-sm-12 > .ng-valid-pattern > .ng-scope > .col-sm-6 > #userPass')
        await txtPassword.click({
            clickCount: 3
        })
        await txtPassword.type('123', {
            delay: 10
        });

        await page.waitForSelector('.col-sm-12 > .ng-valid-pattern > .ng-scope > .col-sm-6 > #cnfPass')
        let txtCPassword = await page.$('.col-sm-12 > .ng-valid-pattern > .ng-scope > .col-sm-6 > #cnfPass')
        await txtCPassword.click({
            clickCount: 3
        })
        await txtCPassword.type('123', {
            delay: 10
        });

        await page.waitForSelector('.col-sm-12 > .ng-valid-maxlength > .row > .col-sm-6 > #email')
        let txtEmail = await page.$('.col-sm-12 > .ng-valid-maxlength > .row > .col-sm-6 > #email')
        await txtEmail.click({
            clickCount: 3
        })
        await txtEmail.type('testbot123@yopmail.com', {
            delay: 10
        });

        await page.waitForSelector('.col-sm-12 > .ng-valid-maxlength > .row > .ng-scope > #kabaKeyId')
        let txtKabaid = await page.$('.col-sm-12 > .ng-valid-maxlength > .row > .ng-scope > #kabaKeyId')
        await txtKabaid.click({
            clickCount: 3
        })
        await txtKabaid.type('121212121', {
            delay: 10
        });

        await page.waitForSelector('.col-sm-12 > .ng-valid-maxlength > .row > .ng-scope > #SGKeyId')
        let txtSGid = await page.$('.col-sm-12 > .ng-valid-maxlength > .row > .ng-scope > #SGKeyId')
        await txtSGid.click({
            clickCount: 3
        })
        await txtSGid.type('122212222', {
            delay: 10
        });

        await page.select('.col-sm-12 > .form-validate > .row > .col-sm-12 > .form-control', 'string:SJ')

        await page.waitForSelector('.col-sm-12 > .form-validate > .row > .col-sm-12 > .form-control')
        await page.click('.col-sm-12 > .form-validate > .row > .col-sm-12 > .form-control')

        await page.waitForSelector('.ng-scope > .ng-scope > .col-sm-12 > .form-validate > .btn:nth-child(7)')
        await page.click('.ng-scope > .ng-scope > .col-sm-12 > .form-validate > .btn:nth-child(7)')

        await page.waitForSelector("button[type='submit']")
        await page.click("button[type='submit']")

    }, timeout)
});