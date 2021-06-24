const { getItem, getItems, addItem, deleteItem, updateItem } = require('../controllers/items')

const itemSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' }
    }
}

// Options for get all items
const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: itemSchema
            }
        }
    },
    handler: getItems
}

// Options for get single item
const getItemOpts = {
    schema: {
        response: {
            200: itemSchema
        }
    },
    handler: getItem
}

// Options for post item
const postItemOpts = {
    schema: {
        body: {
            type:'object',
            required: ['name'],
            properties:{
                name:{type:'string'}
            }
        },
        response: {
            201: itemSchema,
        }
    },
    handler: addItem
}

// Options for delete item
const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type:'object',
                properties:{
                    message: {type: 'string'}
                }
            }
        }
    },
    handler: deleteItem
}

// Options for update item
const updateItemOpts = {
    schema: {
        response: {
            200: itemSchema
        }
    },
    handler: updateItem
}

function itemRoutes(fastify, options, done) {
    // Get all items
    fastify.get('/items', getItemsOpts)

    // Get single item
    fastify.get('/items/:id', getItemOpts)

    // Add item
    fastify.post('/items', postItemOpts)

    // Delete item
    fastify.delete('/items/:id', deleteItemOpts)

    // Update item
    fastify.put('/items/:id', updateItemOpts)

    done()
}

module.exports = itemRoutes