const config = require('config')
const express = require('express')
const authRouter = require('./routes/auth.routes')
const app = express();
const PORT = config.get('serverPort')
const cors = require('./routes/cors')

app.use(cors)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('', authRouter)

const start = () => {
    try {
        app.listen(PORT, ()=>{
            
        })
    } catch (e) {
        console.log(e)
    }
}
start()