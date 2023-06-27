let express = require("express");
let app = express();
let ejs = require("ejs");
const puppeteer = require('puppeteer');
const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({
//     extended:true
// }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const fs = require('fs');
// let pdf = require("html-pdf");
let path = require("path");
const { Console } = require("console");

//console.log(path.join(__dirname, './', "template.ejs"));
app.post("/generateReport", (req, res) => {
    let details=[{name:req.body.name,
        passport:req.body.passport,
        nationality:req.body.nationality,
        residance:req.body.residance,
        assetcountry:req.body.assetcountry 
    },
    {executor1:{name:req.body.exe1.name,
        relation:req.body.exe1.relation,
        passport:req.body.exe1.passport,
        contactno:req.body.exe1.contactno,
        email:req.body.exe1.email
            },
    executor2:{name:req.body.exe2.name,
        relation:req.body.exe2.relation,
        passport:req.body.exe2.passport,
        contactno:req.body.exe2.contactno,
        email:req.body.exe2.email
            }

    }
    ];
    let bank={name:req.body.bank.name,
            bene:req.body.bank.bene
    };
   

    
   console.log(bank.name);
    let browser;
  (async () => {
    browser = await puppeteer.launch();
    const [page] = await browser.pages();
    const html = await ejs.renderFile("template.ejs", {details:details[0],exe:details[1],bank:bank});
    await page.setContent(html);
    const pdf = await page.pdf({format: "A4"});
    res.contentType("application/pdf");

    // optionally:
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=invoice.pdf"
    );

    res.send(pdf);
  })()
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    }) 
    .finally(() => browser?.close());
})




app.get("/",(req,res)=>{
  res.send("Server")
})
app.listen(PORT,(req,res)=>{
  console.log(`Server is runnong on port ${PORT}`)
});
