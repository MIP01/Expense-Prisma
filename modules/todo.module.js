const prisma = require('../helpers/database')
const joi = require('joi')

class _todo {
    listTodo = async () => {
        try {
            const list = await prisma.expense.findMany()

            return {
                status: true,
                data: list
            }
        } catch (error) {
            console.error('listExpense module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    listTodoId = async (body) => {
        try {
            const schema = joi.object({
                user_id: joi.number().required()
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
            const list = await prisma.expense.findMany({
                where: {
                    user_id: body.user_id
                },
                include: {
                    user: true
                }
            })
            return {
                status: true,
                data: list
            }

        } catch (error) {
            console.error('listExpense module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
    
    createTodo = async (body) => {
        try {

            const schema = joi.object({
                user_id: joi.number().required(),
                mutasi: joi.string().required(),
                description: joi.string().required(),
                nominal: joi.number().required(),
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

            const add = await prisma.expense.create({
                data: {
                    user_id: body.user_id,
                    mutasi: body.mutasi,
                    description: body.description,
                    nominal: body.nominal,
                    completed: 0
                }
            })

            return {
                status: true,
                data: add
            }

        } catch (error)  {
            console.error('createExpense module error', error)

            return {
                status: false,
                error
            }
        } 
    }

    updateTodo = async (body) => {
        try {
            const schema = joi.object({
                user_id: joi.number().required(),
                id: joi.number().required(),
                mutasi: joi.string().required(),
                description: joi.string().required(),
                nominal: joi.number().required(),
    
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

            const update = await prisma.expense.update({
                where: {
                    id: body.id
                },
                include: {
                    user: true
                },
                data: {
                    user_id: body.user_id,
                    id: body.id,
                    mutasi: body.mutasi,
                    description: body.description,
                    nominal: body.nominal,
                    completed: 0
                }
            })

            return {
                status: true,
                data: update
            }

        } catch (error) {
            console.error('updateExpense module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    deleteTodo = async (id) => {
        try {
            const schema =joi.number().required()

            const validation = schema.validate(id)

            if (validation.error) {
                const errorDetails = validation.error.details.map(details => details.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails
                }
            }

            const del = await prisma.expense.delete({
                where: {
                    id: id
                }
            })

            return {
                status: true,
                data: del
            }
        } catch (error) {
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _todo()