const pool = require('../connection/connection.js')
async function read(req, res) {
    const tasks = await pool.query('select * from tasks');
    res.json(tasks.rows)
}
async function create(req, res) {
    try {
        const { title, done, due_date, listId } = req.body;
        const tasks = await pool.query('insert into tasks (title, done, due_date, listid) values ($1, $2, $3, $4) returning *',
            [title, done, due_date, listId]);
        res.json(tasks.rows)

    } catch (err) {
        res.status(400).json({ error: 'Invalid Input' })
    }
}

async function edit(req, res) {
    const task = await pool.query('select * from tasks where id=$1', [req.body.id])
    if (task.rows[0]) {
        let obj = task.rows[0];
        let data = Object.assign(obj, req.body);
        const edit = await pool.query('update tasks set title=$1, done=$2, due_date=$3, listId=$4 where id=$5 returning *', [data.title, data.done, data.due_date, data.listid, data.id]);
        res.json(edit.rows);
    } else { res.status(404).json({ error: 'Task not found' }) }

}

async function remove(req, res) {
    let taskId = req.params.id
    const task = await pool.query('delete from tasks where id=$1 returning *', [taskId]);
    task.rows[0] ? res.json(task.rows[0]) : res.status(404).json({ error: 'Task not found' })
}

module.exports = { read, create, edit, remove }