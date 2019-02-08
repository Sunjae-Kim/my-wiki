# Puppeteer

Puppeteer is a Node library which provides a high-level API to control [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) Chrome or Chromium over the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). It can also be configured to use full (non-headless) Chrome or Chromium.

## Simple Example

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
```

## Use Case

Repository: https://github.com/Sunjae-Kim/puppeteer-naver-cafe-crawler

### # Getting information from html tag

```javascript
const puppeteer = require('puppeteer');

const getMenus = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
    
  const prices = await page.$$eval(
      '.list_item.list_item_menu .list_menu_inner .price',
      (list) => list.map((item) => item.innerHTML),
  );
  const menuNames = await page.$$eval(
      '.list_item.list_item_menu .list_menu_inner .name',
      (list) => list.map((item) => item.innerHTML),
  );
    
  await browser.close();
  return { menuNames, prices };
}
```

<br />

### # Using with *log4js*

Using `puppeteer` with `log4js` produces great synergy. It can make errors when you crawl huge amount of data, and `log4js` can catch all these errors for you.

```javascript
// Log4js setting
const log4js = require('log4js');
const logConfiguration = {
  appenders: {
    app: {
      type: 'file',
      filename: 'log/app.log',
      maxLogSize: 10485760,
      numBackups: 3,
    },
    errorFile: {
      type: 'file',
      filename: 'log/errors.log',
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: { appenders: ['app', 'errors'], level: 'TRACE' },
  },
};
log4js.configure(logConfiguration);
const logger = log4js.getLogger('APP');

// Use with puppeteer
const puppeteer = require('puppeteer');

const getPrices = async () => {
  const url = 'https://example.com';
  logger.trace(`Crawl from : ${url}`); 
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto();
    
  try {
    const prices = await page.$$eval(
      '.list_item.list_item_menu .list_menu_inner .price',
      (list) => list.map((item) => item.innerHTML),
    );
    await browser.close();
    return prices;
  } catch(error) {
    await browser.close();
    return logger.error(error.message);
  }
}
```

## Reference

Ref: https://developers.google.com/web/tools/puppeteer

Docs: https://pptr.dev/