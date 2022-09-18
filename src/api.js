const express = require('express')

const serverless =  require('serverless-http')

const app = express();

const router =express.Router()
const cors = require("cors")

app.use(express.json(), cors({
    origin: "*"
}))
 
router.get('/', (req,res) => {
    res.json({
        'hello': 'hi'
    })
})

router.get('/test', (req,res) => {
    res.json({
        'hello': 'hi from test'
    })
})

app.use('/.netlify/functions/api',router)



module.exports.handler = serverless(app)