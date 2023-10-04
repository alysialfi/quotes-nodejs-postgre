import express from 'express'
import cors from 'cors'
import fs from 'fs'
import quotes from './quotes.json' assert { type: "json" }

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return 'Error';
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return 'Error';
        }
    });
}

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/quotes', (req, res) => {
    return res.send(quotes)
})

app.get('/quote/:id', (req, res) => {
    const quote = quotes.find((q) => q.id == req.params.id)
    return res.send(quote)
})

app.get('/quotes/author', (req, res) => {
    const authors = quotes.map((q) => q.author)
    return res.send(authors)
})

app.post('/quote', (req, res) => {
    const quoteBody = req.body
    quotes.push(quoteBody)

    jsonReader('./quotes.json', (err, quote) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        fs.writeFile("./quotes.json", JSON.stringify(quotes), err => {
            if (err) console.log('Error writing file:');
        });
    });
    res.status(200)
    res.send({status: 'Successfuly added a quote!'})
})

app.listen(3000, () => {
    console.log('Server is up');
})
