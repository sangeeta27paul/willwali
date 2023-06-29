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
   console.log(req.body);
    let details=[{name:req.body.name,
        passport:req.body.passport,
        nationality:req.body.nationality,
        residance:req.body.residance,
        assetcountry:req.body.assetcountry,
        id:req.body.willid,
        pic:req.body.pic,
        qr:req.body.qr
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
            bene:req.body.bank.bene,
            share:req.body.bank.share,
            contact:req.body.bank.contact,
            count:req.body.bank.count,
            branch:req.body.bank.branch,
            no:req.body.bank.no
    };
    let property={status:req.body.prop.status,
        bene:req.body.prop.bene,
        share:req.body.prop.share,
        contact:req.body.prop.contact,
        count:req.body.prop.count,
        address:req.body.prop.address,
        type:req.body.prop.type
};

let invest={with:req.body.invest.with,
    bene:req.body.invest.bene,
    share:req.body.invest.share,
    contact:req.body.invest.contact,
    count:req.body.invest.count,
    no:req.body.invest.no,
    type:req.body.invest.type
};
   
let ppf={name:req.body.ppf.name,
    bene:req.body.ppf.bene,
    share:req.body.ppf.share,
    contact:req.body.ppf.contact,
    count:req.body.ppf.count,
    no:req.body.ppf.no
};

let vehicle={name:req.body.veh.name,
    bene:req.body.veh.bene,
    share:req.body.veh.share,
    contact:req.body.veh.contact,
    count:req.body.veh.count,
    no:req.body.veh.no,
    status:req.body.veh.status
};

let ins={name:req.body.ins.name,
    bene:req.body.ins.bene,
    share:req.body.ins.share,
    contact:req.body.ins.contact,
    count:req.body.ins.count,
    no:req.body.ins.no,
    type:req.body.ins.type
};

let gift={item:req.body.gift.item,
    bene:req.body.gift.bene,
    contact:req.body.gift.contact
};
let wish={wish:req.body.wishes.wish
};
let charity={charity:req.body.charity.charity
};
let guardian={guard1:{name:req.body.guard1.name,
    relation:req.body.guard1.relation,
    passport:req.body.guard1.passport,
    contactno:req.body.guard1.contactno,
    email:req.body.guard1.email,
    address:req.body.guard1.address
        },
        guard2:{name:req.body.guard2.name,
            relation:req.body.guard2.relation,
            passport:req.body.guard2.passport,
            contactno:req.body.guard2.contactno,
            email:req.body.guard2.email,
            address:req.body.guard2.address
                }}
   
    
   // console.log(wish);
    let browser;
  (async () => {
      const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disabled-setupid-sandbox"],
  });
    const [page] = await browser.pages();
    //html_footer = `<div style='width:100%;text-align:right'><span style='font-size:10px;margin-right:20px'>Page <span class='pageNumber'></span> of <span class='totalPages'></span>.</span></div>`;
    const html = await ejs.renderFile("template.ejs", {details:details[0],exe:details[1],bank:bank,property:property,invest:invest,ppf:ppf,vehicle:vehicle,ins:ins,gift:gift,wish:wish,charity:charity,guard:guardian});
    await page.setContent(html);
    const pdf = await page.pdf({format: "A4",displayFooter:true, margin: { top: '40px',bottom:"20px" ,right: '40px', left: '40px' }
        });
    res.contentType("application/pdf");

    // optionally:
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=will.pdf"
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
