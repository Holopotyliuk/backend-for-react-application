const pool = require('../connection/connection.js')
const url = require('url');

async function read(req, res) {
    const list = await pool.query('select * from lists');
    res.json(list.rows)
}


async function readById(req, res) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    const list = await pool.query('select lists.list_title, tasks.id, tasks.title, tasks.done, tasks.due_date from lists  right join tasks on lists.listid=tasks.listid where lists.listid=$1', [query.listid]);
    list.rows[0] ? res.json(list.rows) : res.status(404).json({ error: 'List not found' })
}

async function create(req, res) {
    try {
        const { list_title } = req.body;
        const list = await pool.query('insert into lists (list_title) values ($1) returning *',
            [list_title]);
        res.json(list.rows)

    } catch (err) {
        res.status(400).json({ error: 'Invalid Input' })
    }
}

async function remove(req, res) {
    try {
        let listId = req.params.id
        await pool.query('delete from tasks where listid=$1 returning *', [listId]);
        const list = await pool.query('delete from lists where listid=$1 returning *', [listId]);
        res.json(list.rows[0])
    } catch (err) {
        res.status(400).json({ error: 'List not found' })
    }
}

module.exports = { read, readById, create, remove }