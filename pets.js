'use strict'

const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

let node = path.basename(process.argv[0])
let file = path.basename(process.argv[1])
let cmd = process.argv[2]
let index = process.argv[3]


if (cmd === 'read') {
    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) {
            throw err
        }
        let pets = JSON.parse(data)
        if (index) {
            console.log(pets[index])
        } else {
            console.log(pets);
        }
        // return process.stdout.write(JSON.stringify(pets))
    })
} else {
    console.error(`Usage: ${node} ${path} read`)
    process.exit(1)
}
