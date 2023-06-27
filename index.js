let express = require("express");
let app = express();
let ejs = require("ejs");
const puppeteer = require('puppeteer');
const fs = require('fs');
// let pdf = require("html-pdf");
let path = require("path");
let students = [
   {name: "Joy",
    email: "joy@example.com",
    city: "New York",
    country: "USA"},
   {name: "John",
    email: "John@example.com",
    city: "San Francisco",
    country: "USA"},
   {name: "Clark",
    email: "Clark@example.com",
    city: "Seattle",
    country: "USA"},
   {name: "Watson",
    email: "Watson@example.com",
    city: "Boston",
    country: "USA"},
   {name: "Tony",
    email: "Tony@example.com",
    city: "Los Angels",
    country: "USA"
}];
app.get("/generateReport", (req, res) => {
    ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {students: students}, (err, data) => {
    if (err) {
          res.send(err);
    } else {
        (async () => {

            // Create a browser instance
            const browser = await puppeteer.launch();
          
            // Create a new page
            const page = await browser.newPage();
          
            //Get HTML content from HTML file
            const html = fs.readFileSync('template.ejs', 'utf-8');
            await page.setContent(html, { waitUntil: 'domcontentloaded' });
          
            // To reflect CSS used for screens instead of print
            await page.emulateMediaType('screen');
          
            // Downlaod the PDF
            const pdf = await page.pdf({
              path: 'result.pdf',
              margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
              printBackground: true,
              format: 'A4',
            });
          
            // Close the browser instance
            await browser.close();
          })();
    }
});
})
app.listen(3000);