// src/html.test.ts
import puppeteer, { Browser, Page } from 'puppeteer';
import path from 'path';

const file = path.resolve(__dirname, '../src/index.html');

describe('HTML Testing', () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: 'new',
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Button click should update the message', async () => {
        await page.goto(`file://${file}`);

        await page.click('#myButton');

        const message = await page.$eval('#message', (element) => element.textContent);

        expect(message).toBe('Button Clicked!');
    });

    it("should display success notification if login detail is valid", async () => {
        await page.type('#username', 'JDoe2020');
        await page.type('#password', 'rango');
        await page.click('#login-btn');
        expect(await page.$('.alert-success')).toBeTruthy();
    });

    it("Correct return value", async () => {
        const test1 = await page.evaluate((object) => {
            return window['removeProperty'](object, 'a')
        }, { a: 1, b: 2, c: 3 });
        expect(test1).toBeTruthy();
    });

    it("Property removed", async () => {
        const obj = await page.evaluate((object) => {
            const a = window['removeProperty'](object, 'b');
            return object;
        }, { a: 1, b: 2, c: 3 });
        expect(obj).not.toHaveProperty('b');
    });


    it("Uppercase letters", async () => {
        const stringIsIncluded = await page.evaluate(() => {
            const string = 'Check documentation';
            const selector = 'a[href]';
            return document.querySelector<HTMLLinkElement>(selector).innerText.includes(string.toUpperCase());
        });
        expect(stringIsIncluded).toBeTruthy();
    });

    it("No underline", async () => {
        const elementStyles = await page.$eval('a[href]', (ele) => {
            const stylesObject = getComputedStyle(ele);
            const styles = {};
            for (const style in stylesObject) {
                if (stylesObject.hasOwnProperty(style)) {
                    styles[style] = stylesObject[style];
                }
            }
            return styles;
        });
        expect(elementStyles['textTransform']).toEqual('uppercase');
        expect(elementStyles['textDecorationLine']).toEqual('none');
        expect(elementStyles['cursor']).toEqual('help');

    });
});
