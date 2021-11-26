const express = require('express')
const router = express.Router()

router.post('/signin', async (req, res) => {
    
    let sql
    let valid = {}
    let body = req.body
    let result

    const params = [
        {key: 'provider', value: 'a.provider', type: 'str', max: 60, required: true, where: true, eq: true},
        {key: 'auth_id', value: 'a.auth_id', type: 'str', max: 128, required: true, where: true, eq: true, enc: true},
        {key: 'password', value: 'u.password', type: 'str', max: 128, optional: true, where: true, eq: true}
    ]

    try {
        _util.valid(body, params, valid)
    } catch (e) {
        _out.err(res, _CONSTANT.INVALID_PARAMETER, e.toString(), null)
        return
    }

    try {

        if (valid.params['provider'] === "email" && !valid.params['password']) {
            _out.print(res, _CONSTANT.INVALID_PARAMETER, null)
            return
        }

        valid.params['password'] = _util.encryptSha256(valid.params['password'])

        sql = `
            SELECT
                u.id, 
                CAST(AES_DECRYPT(UNHEX(u.birth_date), '${__secret_key}') as char) as birth_date,
                u.role
            FROM
                users u
            INNER JOIN
                auth a
            ON
                u.id = a.user_id
            WHERE
                1=1
                ${valid.where}
        `
        result = await _db.qry(sql, valid.params)

        if (result.length < 1) {
            _out.print(res, _CONSTANT.EMPTY_DATA, null)
            return
        }

    } catch (e) {
        _out.err(res, _CONSTANT.ERROR_500, e.toString(), null)
        return
    }

    try {
        const token = await _jwt.sign({u: result[0]['id'], l: result[0]['role']})
        _out.print(res, null, [token])
    } catch (e) {
        _out.err(res, _CONSTANT.ERROR_500, e.toString(), null)
    }

})

router.post('/signup', async (req, res) => {
    let sql
    let valid = {}
    let body = req.body
    let result

    const params = [
        {key: 'provider', type: 'str', required: true},
        {key: 'auth_id', type: 'str', required: true},
        {key: 'password', value: 'password', type: 'str', optional: true, update: true},
        {key: 'number', type: 'str', required: true},
        {key: 'name', type: 'str', required: true},
        {key: 'gender', value: 'gender', type: 'num', optional: true, update: true},
        {key: 'birth_date', value: 'birth_date', type: 'str', optional: true, update: true, enc: true},
        {key: 'nickname', value: 'nickname', type: 'str', max: 15, optional: true, update: true}
    ]

    try {
        _util.valid(body, params, valid)
    } catch (e) {
        _out.err(res, _CONSTANT.INVALID_PARAMETER, e.toString(), null)
        return
    }

    const conn = await _db.getConn()

    try {
        await conn.beginTransaction()

        if (valid.params['provider'] === "email" && !valid.params['password']) {
            await conn.rollback()
            conn.release()
            _out.print(res, _CONSTANT.INVALID_PARAMETER, null)
            return
        }

        sql = `
            INSERT INTO
                users(
                    number, 
                    name
                )
            VALUES
                (
                    HEX(AES_ENCRYPT(:number, '${__secret_key}')),
                    :name
                )
        `
        result = await _db.execQry(conn, sql, valid.params)

        if (result.insertId < 1) {
            await conn.rollback()
            conn.release()
            _out.print(res, _CONSTANT.EMPTY_DATA, null)
            return
        }

        valid.params['id'] = result.insertId



        valid.params['password'] = _util.encryptSha256(valid.params['password'])

        sql = `
            UPDATE
                users
            SET
                ${valid.update}
            WHERE
                id = :id
        `
        result = await _db.execQry(conn, sql, valid.params)

        if (result.affectedRows < 1) {
            await conn.rollback()
            conn.release()
            _out.print(res, _CONSTANT.NOT_CHANGED, null)
            return
        }

        sql = `
            INSERT INTO
                auth(
                    user_id, 
                    provider, 
                    auth_id
                )
            VALUES
                (
                    :id, 
                    :provider, 
                    HEX(AES_ENCRYPT(:auth_id, '${__secret_key}'))
                )
        `
        result = await _db.execQry(conn, sql, valid.params)

        if (result.insertId < 1) {
            await conn.rollback()
            conn.release()
            _out.print(res, _CONSTANT.EMPTY_DATA, null)
            return
        }

        await conn.commit()
        conn.release()

        _out.print(res, null, [valid.params['id']])

    } catch (e) {
        await conn.rollback()
        conn.release()

        if (e.code === 'ER_DUP_ENTRY') {
            _out.print(res, _CONSTANT.DUPLICATE, null)
            return
        }

        _out.err(res, _CONSTANT.EMPTY_DATA, e.toString(), null)
    }
})

module.exports = router