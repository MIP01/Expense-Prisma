const m$user = require('../modules/user.module')
const { Router } = require('express')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const UserController = Router()

UserController.get('/', async (req, res) => {
    const list = await m$user.listUser()

    response.sendResponse(res, list)
})

UserController.get('/:id', async (req, res) => {
    const list = await m$user.listUserId(Number(req.params.id))

    response.sendResponse(res, list)
})

UserController.post('/', async (req, res) => {
    const add = await m$user.createUser(req.body)

    response.sendResponse(res, add)
})

UserController.put('/',userSession, async (req, res) => {
    const update = await m$user.updateUser({
        id: req.user.id,
        name: req.body.name,
        nis: req.body.nis,
        role: req.body.role,
        password: req.body.password
    })

    response.sendResponse(res, update)
})

UserController.delete('/:id',userSession, async (req, res) => {
    const del = await m$user.deleteUser(Number(req.params.id))

    response.sendResponse(res, del)
})
module.exports = UserController