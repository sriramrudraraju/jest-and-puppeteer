import * as faker from "faker";
import * as puppeteer from "puppeteer";

const person = {
  name: faker.name.firstName() + " " + faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};

describe("Component: Form", () => {
  // change default timeout when using headless: false
  // jest.setTimeout(100000);

  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  beforeAll(async () => {
    // lauch browser with devtools and slow mo
    // browser = await puppeteer.launch({
    //   headless: false,
    //   defaultViewport: null,
    //   slowMo: 50
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

  it("submits contact form", async () => {
    let submittedFlag: boolean;

    // wait for contact form to be loaded on the page
    await page.waitForSelector(".contact-form");

    /**
     * on initial launch, there shouldn't be submitted flag
     */
    submittedFlag = (await page.$("#submitted")) ? true : false;
    expect(submittedFlag).toBe(false);

    // click on fullname input
    await page.click("input[name=fullname]");
    // types random fullname genarated by faker
    await page.type("input[name=fullname]", person.name);

    // click email input
    await page.click("input[name=email]");
    // type random email
    await page.type("input[name=email]", person.email);

    // click text area
    await page.click("textarea[name=message]");
    // type random message
    await page.type("textarea[name=message]", person.message);

    // click checkbox
    await page.click("input[type=checkbox]");

    // click radio yes
    await page.click("label.radio input");

    // click on submit button
    await page.click("button[type=submit]");

    /**
     * once the form is succesfully submitted,
     * submitted flag appears
     */
    submittedFlag = await page.$eval("#submitted", el => (el ? true : false));
    expect(submittedFlag).toBe(true);
  });

  it("fullname is required", async () => {
    let submittedFlag: boolean;
    /**
     * Already form is submitted, as per before test case
     * so UI will have submitted flag
     */
    submittedFlag = (await page.$("#submitted")) ? true : false;
    expect(submittedFlag).toBe(true);

    /**
     * everything else typed except fullname
     */
    // click email input
    await page.click("input[name=email]");
    // type random email
    await page.type("input[name=email]", person.email);

    /**
     * when user changes something with inputs,
     * submitted flag is hidden/removed
     */
    submittedFlag = (await page.$("#submitted")) ? true : false;
    expect(submittedFlag).toBe(false);

    // click text area
    await page.click("textarea[name=message]");
    // type random message
    await page.type("textarea[name=message]", person.message);

    // click checkbox
    await page.click("input[type=checkbox]");

    // click radio yes
    await page.click("label.radio input");

    // click on submit button
    await page.click("button[type=submit]");

    /**
     * as submit button is clicked without fullname
     * there wont be submitted flag
     */
    submittedFlag = (await page.$("#submitted")) ? true : false;
    /**
     * take screenshot for failed case
     */
    if (!submittedFlag) {
      await page.screenshot({ path: "./src/screenshots/fullnameRequired.png" });
    }
    expect(submittedFlag).toBe(false);
  });
});
