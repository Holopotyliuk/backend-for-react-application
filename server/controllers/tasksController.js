const modelsTasks = require('../models/modelsTasks.js')
class Tasks {
    read(req, res) {
        return modelsTasks.read(req, res);
    }
    create(req, res) {
        return modelsTasks.create(req, res);
    }
    edit(req, res) {
        return modelsTasks.edit(req, res);
    }
    remove(req, res) {
        return modelsTasks.remove(req, res);
    }
}
module.exports = new Tasks()