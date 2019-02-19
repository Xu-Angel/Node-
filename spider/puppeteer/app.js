const puppeteer = require('puppeteer');
// https://zhaoqize.github.io/puppeteer-api-zh_CN/
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://xutianshi.top')
  // 截图
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log('Dimensions:', dimensions);
  await page.setViewport({ width: 1600, height: 900 })
  await page.screenshot({ path: 'example.png' })
  // 创建PDF
  // await page.goto('https://xutianshi.top', { waitUntil: 'networkidle2' })
  // await page.pdf({ path: 'top.pdf', format: 'A4' })
  await browser.close()
})();