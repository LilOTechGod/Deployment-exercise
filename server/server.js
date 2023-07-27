const express = require('express')
const app = express()
const path = require('path')
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '1f6399041b17434f9e169b7a60902be7',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.use(express.json());
app.use(express.static(`public`))

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

app.get('/api/guitar', (req, res) => {

    try{
        nonExistentFunction()
    } catch(err) {
        rollbar.error(err)
        console.error(err)
    }
    res.status(200).send('Guitar')
})

app.listen(4000, () => console.log(`server running on 4000`))