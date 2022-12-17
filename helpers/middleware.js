const prisma = require('../helpers/database')
const jwt = require('jsonwebtoken')

const userSession = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decode = jwt.verify(token, 'jwt-secret-code')

            console.log(decode)

            const user = await prisma.user.findUnique({
                where: {
                    id: decode.id
                }
            })

            if (user) {
                req.user = {
                    id: user.id,
                    email: user.email
                }
                next()
            } else {
                res.status(403).send({
                    status: false,
                    error: 'Not authenticate'
                })
            }
        } catch (error) {
            console.error('userSession middleware Error', error)

            res.status(401).send({
                status: false,
                error: 'Not authorize'
            })
        }
    }

    if (!token) {
        res.status(401).send({
            status: false,
            error: 'Not authorize'
        })
    }
}

module.exports = userSession