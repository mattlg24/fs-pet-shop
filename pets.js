'use strict'

const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

let express = require('express')
let app = express()
let port = process.env.PORT || 8000

let node = path.basename(process.argv[0])
let file = path.basename(process.argv[1])
let cmd = process.argv[2]

app.get('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error('Error: ', err);
            res.status(500).send('Something broke')
        }

        var pets = JSON.parse(petsJSON)

        res.send(pets)
    })
})

app.get('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error('Error: ', err);
            res.status(500).send('Something broke')
        }

        let id = Number.parseInt(req.params.id)
        let pets = JSON.parse(petsJSON)

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            res.status(404).send('Sorry can\'t find that')
        }

        res.set('content-Type', 'text/plain')
        res.send(pets[id])
    })
})

app.use(function(req, res) {
    res.status(404).send('Sorry can\'t find that')
})

// app.use(function(req, res) {
//             res.status(404).send("Page not found")
//         }


// if (cmd === 'read') {
//     fs.readFile(petsPath, 'utf8', function(err, data) {
//         let index = process.argv[3]
//         if (err) {
//             throw err
//         }
//         let pets = JSON.parse(data)
//         if (index > pets.length - 1 || index < 0) {
//             console.log(`Usage: ${node} ${file} read INDEX`);
//         } else if (index === undefined) {
//             console.log(pets)
//         } else {
//             console.log(pets[index]);
//         }
//     })
//
// } else if (cmd === 'create') {
//     fs.readFile(petsPath, 'utf8', function(createErr, data) {
//         if (createErr) {
//             throw createErr
//         }
//
//         var pets = JSON.parse(data)
//         var age = process.argv[3]
//         var kind = process.argv[4]
//         var name = process.argv[5]
//
//         if (!age || !kind || !name) {
//             console.log(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
//             process.exit(1)
//         }
//
//         var pet = {
//             age: age,
//             kind: kind,
//             name: name
//         }
//
//         pets.push(pet)
//
//         var petsJSON = JSON.stringify(pets)
//
//         fs.writeFile(petsPath, petsJSON, function(writeErr) {
//             if (writeErr) {
//                 throw writeErr
//             }
//             console.log(pet);
//         })
//
//     })

// }
// else {
//     console.error(`Usage: ${node} ${path} read`)
//     process.exit(1)
// }

app.listen(port, function() {
    console.log('Listening on port ', port);
})
