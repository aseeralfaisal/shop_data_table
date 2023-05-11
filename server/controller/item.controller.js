const Item = require('../model/item.model')

const createItem = async (req, res) => {
    try {
        const { name, created_by } = req.body
        const newItem = await Item.create({ name, created_by })
        res.json(newItem)
    } catch (error) {
        console.error(error)
    }
}

const getItem = async (_, res) => {
    try {
        const items = await Item.find()
        res.json(items)
    } catch (error) {
        console.error(error)
    }
}

const updateItem = async (req, res) => {
    try {
        const { name, newname } = req.body
        const itemFound = await Item.findOne({ name })
        if (itemFound) {
            itemFound.name = newname
            const updatedItem = await itemFound.save()
            res.json(updatedItem)
        }
    } catch (error) {
        console.error(error)
    }
}

const deleteItem = async (req, res) => {
    try {
        const { name } = req.body
        const itemFound = await Item.findOne({ name })
        if (itemFound) {
            await itemFound.deleteOne()
        }
        res.json(itemFound)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

module.exports = {
    createItem,
    getItem,
    updateItem,
    deleteItem
}
