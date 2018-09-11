import * as puppeteer from "puppeteer";

describe("routing", () => {
  // change default timeout when using headless: false
  // jest.setTimeout(100000);

  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  beforeAll(async () => {
    // lauch browser with devtools and slow mo
    // browser = await puppeteer.launch({
    //   headless: false,
    //   defaultViewport: null,
    //   slowMo: 100
    // });
    browser = await puppeteer.launch();
    // opens the new tab
    page = await browser.newPage();
    // redirects to url
    await page.goto("http://localhost:3000");
  });

  afterAll(() => {
    // closes the browser
    browser.close();
  });

  it("defaults to contact form route", async () => {
    // waits until selector is loaded on to DOM
    await page.waitForSelector('div.Form'); 

    const html = await page.$eval("div.Form > div > h2", e => e.innerHTML);
    expect(html).toBe("Contact Form");
  });

  it("will have contact form on page reload", async () => {
    await page.reload();
    const html = await page.$eval("div.Form > div > h2", e => e.innerHTML);
    expect(html).toBe("Contact Form");
  });

  it("redirects to Api route by clicking on Api link", async () => {
    await page.click("div.nav > a:nth-child(2)");
    const html = await page.$eval(
      "#root > div > div > div > div:nth-child(2) > h2",
      e => e.innerHTML
    );
    expect(html).toBe("Api Example");
  });

  it("redirects to Form route by clicking on Form link", async () => {
    await page.click("div.nav > a:nth-child(1)");
    const html = await page.$eval("div.Form > div > h2", e => e.innerHTML);
    expect(html).toBe("Contact Form");
  });
});
