const express = require('express')
const router = express.Router()

const authCheck = require( `${__base}/routes/v1/auth_check` )
const auth = require( `${__base}/routes/v1/auth` )
const test = require( `${__base}/routes/v1/test` )


router.use('/auth', auth)

router.use(authCheck)

router.use('/test', test)


module.exports = router