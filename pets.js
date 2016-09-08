'use strict'

const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

fs.readFile(petsPath, 'utf8', function(err, data) {
  if (err) {
    throw err
  }
  let pets = JSON.parse(data)

  console.log(pets);
})

// console.error(`Usage: node pets.js [read | create | update | destroy]`)

process.exit(1)
