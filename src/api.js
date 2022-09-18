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

app.post('/encrypt', (req, res) => {

    const {pubKey} = req.body;
    const {message} = req.body

    const encryptedMessage = ethUtil.bufferToHex(
        Buffer.from(
            JSON.stringify(
                sigUtil.encrypt({
                    // publicKey: "caLC5HV02VNCs3qtf9Ct61UlnjWnDGDfy3/IZ1Xy+XA=",
                    publicKey:pubKey,
                    // data: 'Message from wallet',
                    data: message,
                    version: 'x25519-xsalsa20-poly1305',
                })
            ),
            'utf8'
        )
    );
    res.status(200).send({
        encMessage: encryptedMessage
    }
    )
})

app.use('/.netlify/functions/api',router)



module.exports.handler = serverless(app)