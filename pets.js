'use strict'

const fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

let express = require('express')
let app = express()
let port = process.env.PORT || 8000

let morgan = require('morgan')
let bodyParser = require('body-parser')

app.use(morgan('short'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.error('Error: ', err);
            console.error(err.stack);
            res.status(500).send('Something broke!')
        }

        var pets = JSON.parse(petsJSON)

        res.send(pets)
    })
})

app.post('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
        if (readErr) {
            console.error('Error: ', err);
            res.status(500).send('Something broke!')
        }

        let pets = JSON.parse(petsJSON)
        let pet = {
            age: parseInt(req.body.age),
            kind: req.body.kind,
            name: req.body.name
        }

        if (!pet) {
            res.status(400).send('Sorry can\'t find that!')
        } else if (pet.name === '' || pet.kind === '') {
            res.status(400).send('Sorry can\'t find that!')
        } else if (isNaN(pet.age)) {
            res.status(400).send('Sorry can\'t find that!')
        } else {
            pets.push(pet)
        }


        let newPetsJSON = JSON.stringify(pets)

        fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
            if (writeErr) {
                console.error('Error: ', writeErr);
                res.status(500).send('Something broke!')
            }

            res.set('Content-Type', 'text/plain')
            res.send(pet)
        })
    })
})

app.put('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
        if (readErr) {
            console.error('Error: ', err);
            res.status(500).send('Something broke!')
        }

        let id = Number.parseInt(req.params.id)
        let pets = JSON.parse(petsJSON)

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            res.status(404).send('Sorry can\'t find that!')
        }

        let pet = {
            age: parseInt(req.body.age),
            kind: req.body.kind,
            name: req.body.name
        }

        if (!pet) {
            res.status(400).send('Sorry can\'t find that!')
        } else if (pet.name === '' || pet.kind === '') {
            res.status(400).send('Sorry can\'t find that!')
        } else if (isNaN(pet.age)) {
            res.status(400).send('Sorry can\'t find that!')
        }

        pets[id] = pet

        let newPetsJSON = JSON.stringify(pets)

        fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
            if (writeErr) {
                console.error('Error: ', writeErr);
                res.status(500).send('Something broke!')
            }

            res.set('Content-Type', 'text/plain')
            res.send(pet)
        })
    })
})

app.delete('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
        if (readErr) {
            console.error('Error: ', readErr);
            res.status(500).send('Something broke!')
        }

        let id = Number.parseInt(req.params.id)
        let pets = JSON.parse(petsJSON)

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            res.status(404).send('Sorry can\'t find that!')
        }

        let pet = pets.splice(id, 1)[0]
        let newPetsJSON = JSON.stringify(pets)

        fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
            if (writeErr) {
                console.error('Error: ', writeErr);
                res.status(500).send('Something broke!')
            }

            res.set('Content-Type', 'text/plain')
            res.send(pet)
        })
    })
})

app.get('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, newPetsJSON) {
        if (err) {
            console.error('Error: ', err);
            console.error(err.stack);
            res.status(500).send('Something broke!')
        }

        let id = Number.parseInt(req.params.id)
        let pets = JSON.parse(newPetsJSON)

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            res.status(404).send('Sorry can\'t find that!')
        }

        res.set('content-Type', 'text/plain')
        res.send(pets[id])
    })
})

app.use(function(req, res) {
    res.status(404).send('Sorry can\'t find that')
})

app.listen(port, function() {
    console.log('Listening on port ', port);
})
