const express = require('express')
const router = express.Router()

router.post('/', (req, res) => 
    _out.print(res, null, [req.body])
)

router.get('/signin', async (req, res) => {
    
    let sql
    let valid = {}
    let result

    try {
        sql = `
            SELECT
                *
            FROM 
                users
        `
        result = await _db.qry(sql, valid)

        if (result.length < 1) {
            _out.print(res, _CONSTANT.EMPTY_DATA, null)
            return
        }

        _out.print(res, null, result)

    } catch (e) {
        _out.err(res, _CONSTANT.ERROR_500, e.toString(), null)
    }
})

router.post('/signup', async (req, res) => {
    
})

module.exports = router