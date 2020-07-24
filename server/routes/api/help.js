const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

//GET help
router.get('/', async (req, res) => {
    const helpPost = await loadHelpPostsCollection()
    res.send(await helpPost.find({}).toArray())
})

//ADD help
router.post('/', async (req, res) => {
    const helpPost = await loadHelpPostsCollection()
    await helpPost.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send()
})

//DELETE help
router.delete('/:id', async (req, res) => {
    const helpPost = await loadHelpPostsCollection()
    await helpPost.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(200).send()
})

async function loadHelpPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://viskoos:888wwwnnae@cluster0.ofoax.azure.mongodb.net/vue_express?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return client.db('vue_express').collection('helpPosts')
}


module.exports = router