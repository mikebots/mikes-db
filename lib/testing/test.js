const { MongoDatabase } = require('../../index.js');
const fs = require('fs')
const { inspect } = require('util')
const hi = new MongoDatabase({ mongodb: `mongodb://localhost/test-db`, logsFile: `db-logs.log`})

hi.set(`Sup-bob`, { welcome: 'sir', his: ['hello']}).then(m =>{
    fs.appendFile(`db-logs.log`, `\n${inspect(m, { depth: 2})}`, function (err) {
        if(err) throw err;
        console.log("saved")
    })
}).catch(console.log)
hi.fetch(`Sup-bob`).then(console.log).catch(console.error)