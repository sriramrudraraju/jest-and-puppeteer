import * as puppeteer from 'puppeteer';

describe('Launch page', () => {
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
  
  it('title loads correctly', async () => {
    // waits until selector is loaded on to DOM
    await page.waitForSelector('.App-title'); 
    // once loaded, returns the innerHTML
    const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Testing React app with Jest Puppeteer');
  });

  it('has 2 navigation links', async () => {
    const navLinks = await page.$$('.navLinks');
    expect(navLinks.length).toBe(2);
  })
})