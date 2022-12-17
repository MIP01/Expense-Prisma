const prisma = require('../helpers/database')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class _auth {
    login = async (body) => {
        try {
            const schema =joi.object({
                nis: joi.number().required(),
                password: joi.string().required(),
                role: joi.string().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(details => details.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const user =await prisma.user.findFirst({
                where: {
                    nis: body.nis
                }
            })

            if (!user) {
                return {
                    status: false,
                    code: 404,
                    error: 'User not found'
                }
            }

            if (!bcrypt.compareSync(body.password, user.password)) {
                return {
                    status: false,
                    code: 401,
                    error: 'password false'
                }
            }

            const payload = {
                id: user.id,
                password: user.password,
                role: user.role
            }

            const token =jwt.sign(payload, 'jwt-secret-code', {expiresIn: '8h' })

            return {
                status: true,
                data: {
                    token
                }
            }

            } catch (error) {
                console.error('Login auth module error: ', error)

                return {
                    status: false,
                    error
            }
        }
    }
}

module.exports = new _auth()