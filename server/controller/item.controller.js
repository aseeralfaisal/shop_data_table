const item = require('../model/item.model')

const createItem = async (req, res) => {
    try {
        const { name, created_by } = req.body
        const createItem = await item.create({ name, created_by })
        res.send(createItem)
    } catch (error) {
        console.log(error)
    }
}

const getItem = async (req, res) => {
    try {
        const items = await item.find()
        res.json(items)
    } catch (error) {
        console.log(error)
    }
}
const updateItem = async (req, res) => {
    try {
        const { name, newname } = req.body
        const itemFound = await item.findOne({ name })
        if (itemFound) {
            itemFound.name = newname
        }
        const saveItem = await itemFound.save()
        res.json(saveItem)
    } catch (error) {
        console.log(error)
    }
}

const deleteItem = async (req, res) => {
    const { name } = req.body
    const itemFound = await item.findOne({ name })
    if (itemFound) {
        itemFound.deleteOne()
    }
    res.json(itemFound)
}

module.exports = {
    createItem,
    getItem,
    updateItem,
    deleteItem
}