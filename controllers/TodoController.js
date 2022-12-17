const m$todo = require('../modules/todo.module')
const { Router } = require('express')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const TodoController = Router()

TodoController.get('/', async (req, res) => {
    const list = await m$todo.listTodo()

    response.sendResponse(res, list)
})

TodoController.get('/list',userSession, async (req, res) => {
    const list = await m$todo.listTodoId({ user_id:req.user.id})

    response.sendResponse(res, list)
})

TodoController.post('/',userSession, async (req, res) => {
    const add = await m$todo.createTodo({
        user_id: req.user.id,
        mutasi: req.body.mutasi,
        description: req.body.description,
        nominal: req.body.nominal
    })

    response.sendResponse(res, add)
})

TodoController.put('/',userSession, async (req, res) => {
    const update = await m$todo.updateTodo({
        user_id: req.user.id,
        id: req.body.id,
        mutasi: req.body.mutasi,
        description: req.body.description,
        nominal: req.body.nominal
    })

    response.sendResponse(res, update)
})

TodoController.delete('/:id',userSession, async (req, res) => {
    const del = await m$todo.deleteTodo(Number(req.params.id))

    response.sendResponse(res, del)
})

module.exports = TodoController