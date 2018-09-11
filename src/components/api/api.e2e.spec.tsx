import * as puppeteer from "puppeteer";

describe("api route", () => {
  // change default timeout when using headless: false
  // jest.setTimeout(100000);

  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  beforeAll(async () => {
    // lauch browser with devtools and slow mo
    // browser = await puppeteer.launch({
    //   headless: false,
    //   defaultViewport: null,
    //   slowMo: 100,
    //   devtools: true
    // });
    browser = await puppeteer.launch();
    // opens the new tab
    page = await browser.newPage();
    // redirects to url
    await page.goto("http://localhost:3000/api");
  });

  afterAll(() => {
    // closes the browser
    browser.close();
  });

  it("fetches pokemon data", async () => {
    // waits until selector is loaded on to DOM
    await page.waitForSelector(
      "#root > div > div > div > div:nth-child(2) > h2"
    );

    // as soon as the page loads, user will see loading.. status
    const loadingHtml = await page.$eval(".pokemon", e => e.innerHTML);
    expect(loadingHtml).toBe(`Loading data ...`);

    // testing for success response
    // wait till request is completed
    const response = await page.waitForResponse(
      "https://pokeapi.co/api/v2/pokemon/150/"
    );
    const data = await response.json();
    const dataHtml = await page.$eval(".pokemon", e => e.innerHTML);
    expect(dataHtml).toBe(`Name: ${data.name} Id: ${data.id}`);
  });

  it("shows error message", async () => {
    await page.setRequestInterception(true);
    page.on("request", interceptedRequest => {
      if (
        interceptedRequest.url() === "https://pokeapi.co/api/v2/pokemon/150/"
      ) {
        interceptedRequest.abort();
      } else {
        interceptedRequest.continue();
      }
    });

    // reload the page
    await page.reload();

    // waits until selector(Api Example heading) is loaded on to DOM
    await page.waitForSelector(
      "#root > div > div > div > div:nth-child(2) > h2"
    );

    const errorHtml = await page.$eval(".pokemon", e => e.innerHTML);
    expect(errorHtml).toBe(`Ooops..`);
  });
});
