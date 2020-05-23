const faunadb = require('faunadb')
const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })
const q = faunadb.query

exports.handler = async (event, context) => {
  try {
    const {date, text, id} = JSON.parse(event.body)
    // console.log(date,text,id)
    const req = await faunaClient.query(q.Update(q.Ref(`classes/memories/${id}`), { data: { date, text } }))

    // console.log(req)
    return { 
      statusCode: 200,
      body: JSON.stringify({ mem: req }) 
    }
  } catch (err) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: err.message }) 
    }
  }
}
