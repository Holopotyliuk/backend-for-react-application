const modelsLists = require('../models/modelsDashboard')
class Tasks {
    read(req, res) {
        return modelsLists.read(req, res);
    }

}
module.exports = new Tasks()