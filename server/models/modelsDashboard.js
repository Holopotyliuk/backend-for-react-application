const pool = require('../connection/connection.js')
async function read(req, res) {
    try {
        const lists = await countUncomplitedTasks();
        getUncomplitedTasks(res, lists.rows)
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
function getUncomplitedTasks(res, lists) {
    let result = {
        list: {},
        task: ''
    }
    let promises = lists.map(list => {
        return pool.query('select * from tasks where done=false and listid=$1', [list.listid])
            .then(data => {
                let newResult = { ...result, list: list, task: data.rows }
                return newResult;
            });
    });

    Promise.all(promises).then(response => {
        res.json(response)
    }).catch((error) =>  res.status(500).json({ error: 'Internal Server Error' }))
}
function countUncomplitedTasks() {
    const lists = pool.query('select lists.listid, lists.list_title,  count(lists.listid) from lists  right join tasks on lists.listid=tasks.listid where done=false GROUP by lists.listid, lists.list_title');
    return lists
}

module.exports = { read }
