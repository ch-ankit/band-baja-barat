const express = require('express');
const morgan = require('morgan');
const app = express();
const cords = require('cors')
const router = express.Router();

app.use(cords())
app.use(morgan('dev'));
router.route('/')
    .get((req, res, next) => {
        res.json({
            status: "success",
            body: {
                message: "Hello there"
            }
        })
    })
    .post((req, res, next) => {
        console.log(req.requestTime)
        res.json({
            data: {
                message: "Data Recieved at the backend"
            }
        })
    })
app.use('/postReq', router)
app.use('/', router)

app.listen(5000, () => {
    console.log('Backend server running at port 5000')
})