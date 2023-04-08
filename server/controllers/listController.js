const modelsLists = require('../models/modelsLists')
class Tasks {
    read(req, res) {
        return modelsLists.read(req, res);
    }
    readById(req, res) {
        return modelsLists.readById(req, res);
    }
    create(req, res) {
        return modelsLists.create(req, res);
    }
    remove(req, res) {
        return modelsLists.remove(req, res);
    }

}
module.exports = new Tasks()