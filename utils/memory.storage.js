const MemoryStorage = require('memorystorage')

let storage = new MemoryStorage('notes-app')

exports.getKeys = (storage) => {
    let keys = []
    for (let i = 0; i < storage.length; i++) {
        keys.push(storage.key(i))
    }
    return keys
}

exports.getValues = (storage) => {
    let values = []
    for (let i = 0; i < storage.length; i++) {
        let key = storage.key(i)
        values.push(storage.getItem(key))
    }
    return values
}

exports.storage = storage
