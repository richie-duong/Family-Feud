import express from 'express';
import { db, connectToDb } from './database.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/question/:id', async (req, res) => {
    const query = await db.collection('family-feud').findOne({ "feature": "questions" })
    res.json(query)
})

app.post('/names/submit', async (req, res)=>{
    const {firstTeam} = req.body
    const {secondTeam} = req.body
    const redir = {redirect: '/question/0'}
    await db.collection('family-feud').updateOne({ "feature": "questions" }, {$set: {"teamNames.0" : firstTeam}})
    await db.collection('family-feud').updateOne({ "feature": "questions" }, {$set: {"teamNames.1" : secondTeam}})
    res.json(redir)
})

app.post('/question/:id/update', async (req, res) => {
    const {points} = req.body
    const {winningTeam} = req.body
    const {lockQuestions} = req.body
    const redir = {redirect: '/scoreboard'}

    switch (winningTeam) {
        case 0:
            await db.collection('family-feud').updateOne({ "feature": "questions" }, {$inc: {"scores.0" : points}})
            await db.collection('family-feud').updateOne({ "feature": "questions" }, {$set: {completed : lockQuestions}})
            await db.collection('family-feud').updateOne({ "feature": "questions" }, {$inc: {completeCount : 1}})
            break;
        case 1:
            await db.collection('family-feud').updateOne({ "feature": "questions" }, {$inc: {"scores.1" : points}})
            await db.collection('family-feud').updateOne({ "feature": "questions" }, {$set: {completed : lockQuestions}})
            await db.collection('family-feud').updateOne({ "feature": "questions" }, {$inc: {completeCount : 1}})
            break;
        default:
            break;
    }
    res.json(redir)
})

app.get('/winner', async (req, res) => {
    const query = await db.collection('family-feud').findOne({ "feature": "questions" })
    res.json(query)
})

connectToDb( () => {
    console.log('Connected to MongoDB!')

    app.listen(8000, ()=> {
        console.log('Server is listening on port 8000.')
    })
})


