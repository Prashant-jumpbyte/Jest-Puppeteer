const path = require('path');
const timeout = 500000
const shipmentData = require('../data/shipment-batch.json');

describe('/ (Shipment-batch)', () => {
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
                path: `${path.resolve(__dirname, '..', '..', 'results')}/shipment-batch-test-1.png`,
            });
        }
    }, timeout)

    it("Add shipment batch / Error Tracking Id already exist", async () => {

        await page.waitForSelector('.container-fluid > #bs-example-navbar-collapse-1 > .nav > .dropdown > .ng-binding')
        await page.click('.container-fluid > #bs-example-navbar-collapse-1 > .nav > .dropdown > .ng-binding')

        await page.waitForSelector('.dropdown > .dropdown-menu > .ng-scope:nth-child(7) > .ng-scope > .ng-scope')
        await page.click('.dropdown > .dropdown-menu > .ng-scope:nth-child(7) > .ng-scope > .ng-scope')

        await page.waitForSelector('.col-sm-3 > .searchandselect > .header > .caption > span')
        await page.click('.col-sm-3 > .searchandselect > .header > .caption > span')

        // await page.waitForSelector('.form-validate > .row > .col-sm-3 > .searchandselect > .header')
        // await page.click('.form-validate > .row > .col-sm-3 > .searchandselect > .header')

        await page.waitForSelector('.dropdownone > .inner-item > .child:nth-child(2) > .width-per95 > .ng-binding')
        await page.click('.dropdownone > .inner-item > .child:nth-child(2) > .width-per95 > .ng-binding')

        let count = 0;
        let txtIdLoc, txtTrackingIdLoc, txtAmountLoc

        for (i in shipmentData.shipment.invalid) {
            count++
            txtIdLoc = '.scroll-content > .ng-isolate-scope:nth-child(' + count + ') > .col-width-100 > div > .ng-invalid-required'
            txtTrackingIdLoc = '.table > .scroll-content > .shipment-record:nth-child(' + count + ') > .col-width-100:nth-child(2) > .form-control'
            txtAmountLoc = '.table > .scroll-content > .shipment-record:nth-child(' + count + ') > .col-width-100:nth-child(3) > .form-control'
            txtLast = '.table > .scroll-content > .shipment-record:nth-child(' + count + ') > .coin-entry:nth-child(10) > .form-control'

            await page.waitForSelector(txtIdLoc)
            let txtId = await page.$(txtIdLoc)
            await txtId.click({
                clickCount: 1
            })
            await txtId.type(shipmentData.shipment.invalid[count - 1].ID, {
                delay: 10
            });

            await page.waitForSelector(txtTrackingIdLoc)
            let txtTrackingId = await page.$(txtTrackingIdLoc)

            await txtTrackingId.click({
                clickCount: 1
            })

            await txtTrackingId.type(shipmentData.shipment.invalid[count - 1].trackingId, {
                delay: 10
            });

            await page.waitForSelector(txtAmountLoc)
            let txtAmount = await page.$(txtAmountLoc)
            await txtAmount.click({
                clickCount: 1
            })
            await txtAmount.type(shipmentData.shipment.invalid[count - 1].amount.toString(), {
                delay: 10
            });

            if (count != shipmentData.shipment.invalid.length) {

                await page.focus(txtLast);
                //--------------First option for key press----------------
                await page.keyboard.press('Tab');
                await page.keyboard.press('Tab');

                //--------------Second option for key press----------------
                // await page.keyboard.down('Tab');
                // await page.keyboard.up('Tab');
                // await page.keyboard.down('Tab');
                // await page.keyboard.up('Tab');
            }
        }

        let btnRout = await page.$('.form-validate > .row > .col-sm-3 > .btn-group > .btn:nth-child(1)')
        await btnRout.click();
        dpRoute = '.table > .scroll-content > .shipment-record:nth-child(' + count + ') > .col-width-100:nth-child(12) > .form-control'
        await page.waitForSelector(dpRoute)
        await page.waitFor(1000)
        count = 0;
        for (i in shipmentData.shipment.invalid) {
            count++
            dpRoute = '.table > .scroll-content > .shipment-record:nth-child(' + count + ') > .col-width-100:nth-child(12) > .form-control'
            await page.waitForSelector(dpRoute)

            await page.select(dpRoute, 'string:' + shipmentData.shipment.invalid[count - 1].Route)
        }
        let btnCommit = await page.$('.form-validate > .row > .col-sm-3 > .btn-group > .btn:nth-child(2)')
        await btnCommit.click();
        await page.waitFor(3000)

        btnerror = '.modal > .modal-dialog > .modal-content > .bg-danger > #modal-title'
        if (await page.waitForSelector(btnerror) !== null) {
            await page.waitForSelector(btnerror)
            await page.click(btnerror)

            await page.waitForSelector('.modal > .modal-dialog > .modal-content > .modal-footer > .btn')
            await page.click('.modal > .modal-dialog > .modal-content > .modal-footer > .btn')
        } else {
            let btnCommit = await page.$('.form-validate > .row > .col-sm-3 > .btn-group > .btn:nth-child(2)')
            await btnCommit.click();
        }

        await page.waitFor(2000)

    }, timeout)

    it("Add shipment batch / Valid Shipment", async () => {

        // let VbtnReset = '.form-validate > .row > .col-sm-3 > .btn-group > .btn-danger'
        let VbtnReset = '.form-validate > .row > .col-sm-3 > .btn-group > .btn:nth-child(3)'

        await page.waitForSelector(VbtnReset)
        await page.click(VbtnReset, {
            clickCount: 3
        })
        await page.waitFor(1000)
        let VbtnModalError = '.modal > .modal-dialog > .modal-content > .modal-footer > .btn-danger'
        try {
            await page.waitForSelector(VbtnModalError)
            await page.click(VbtnModalError)
        } catch (e) {
            await page.screenshot({
                fullPage: true,
                path: `${path.resolve(__dirname, '..', '..', 'results')}/Shipment-batch-Reset-bnt.png`,
            });
        }
        await page.waitFor(1000)
        // await page.waitForSelector('.container-fluid > #bs-example-navbar-collapse-1 > .nav > .dropdown > .ng-binding')
        // await page.click('.container-fluid > #bs-example-navbar-collapse-1 > .nav > .dropdown > .ng-binding')

        // await page.waitForSelector('.dropdown > .dropdown-menu > .ng-scope:nth-child(7) > .ng-scope > .ng-scope')
        // await page.click('.dropdown > .dropdown-menu > .ng-scope:nth-child(7) > .ng-scope > .ng-scope')

        await page.waitForSelector('.form-validate > .row > .col-sm-3 > .searchandselect > .selected-text-width')
        await page.click('.form-validate > .row > .col-sm-3 > .searchandselect > .selected-text-width')
        await page.waitFor(1000)
        await page.waitForSelector('.col-sm-3 > .searchandselect > .header > .caption > span')
        await page.click('.col-sm-3 > .searchandselect > .header > .caption > span')
        await page.waitFor(1000)
        await page.waitForSelector('.dropdownone > .inner-item > .child:nth-child(2) > .width-per95 > .ng-binding')
        await page.click('.dropdownone > .inner-item > .child:nth-child(2) > .width-per95 > .ng-binding')

        let count = 0;
        let txtIdLoc, txtTrackingIdLoc, txtAmountLoc

        for (i in shipmentData.shipment.valid) {
            count++
            txtIdLoc = '.scroll-content > .ng-isolate-scope:nth-child(' + count + ') > .col-width-100 > div > .ng-invalid-required'
            txtTrackingIdLoc = '.table > .scroll-content > .shipment-record:nth-child(' + count + ') > .col-width-100:nth-child(2) > .form-control'
            txtAmountLoc = '.table > .scroll-content > .shipment-record:nth-child(' + count + ') > .col-width-100:nth-child(3) > .form-control'
            txtLast = '.table > .scroll-content > .shipment-record:nth-child(' + count + ') > .coin-entry:nth-child(10) > .form-control'

            await page.waitForSelector(txtIdLoc)
            let txtId = await page.$(txtIdLoc)
            await txtId.click({
                clickCount: 1
            })
            await txtId.type(shipmentData.shipment.valid[count - 1].ID, {
                delay: 10
            });

            await page.waitForSelector(txtTrackingIdLoc)
            let txtTrackingId = await page.$(txtTrackingIdLoc)

            await txtTrackingId.click({
                clickCount: 1
            })

            await txtTrackingId.type(shipmentData.shipment.valid[count - 1].trackingId, {
                delay: 10
            });

            await page.waitForSelector(txtAmountLoc)
            let txtAmount = await page.$(txtAmountLoc)
            await txtAmount.click({
                clickCount: 1
            })
            await txtAmount.type(shipmentData.shipment.valid[count - 1].amount.toString(), {
                delay: 10
            });

            if (count != shipmentData.shipment.valid.length) {

                await page.focus(txtLast);
                //--------------First option for key press----------------
                await page.keyboard.press('Tab');
                await page.keyboard.press('Tab');

                //--------------Second option for key press----------------
                // await page.keyboard.down('Tab');
                // await page.keyboard.up('Tab');
                // await page.keyboard.down('Tab');
                // await page.keyboard.up('Tab');
            }
        }

        let btnRout = await page.$('.form-validate > .row > .col-sm-3 > .btn-group > .btn:nth-child(1)')
        await btnRout.click();
        dpRoute = '.table > .scroll-content > .shipment-record:nth-child(' + count + ') > .col-width-100:nth-child(12) > .form-control'
        await page.waitForSelector(dpRoute)
        await page.waitFor(2000)
        count = 0;
        for (i in shipmentData.shipment.valid) {
            count++

            await page.waitForSelector(dpRoute)
            await page.select(dpRoute, 'string:' + shipmentData.shipment.valid[count - 1].Route)
        }

        let btnCommit1 = await page.$('.form-validate > .row > .col-sm-3 > .btn-group > .btn:nth-child(2)')
        await btnCommit1.click();
        await page.waitFor(3000)

        try {
            console.log("try")
            await expect(await page.$evl('.modal-sm > .modal-content > .ng-pristine > .modal-footer > .ng-binding')).not(null);
        } catch (err) {
            await page.screenshot({
                fullPage: true,
                path: `${path.resolve(__dirname, '..', '..', 'results')}/Login-test-2.png`,
            });
        }

        await page.waitForSelector('.modal-sm > .modal-content > .ng-pristine > .modal-footer > .ng-binding')
        await page.click('.modal-sm > .modal-content > .ng-pristine > .modal-footer > .ng-binding')

    }, timeout)


}, timeout);