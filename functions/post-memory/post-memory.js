const faunadb = require('faunadb')
const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })
const q = faunadb.query

exports.handler = async (event, context) => {
  try {
    const memory = { 
      data: JSON.parse(event.body) 
    }
    const req = await faunaClient.query(q.Create(q.Collection("memories"), memory))

    console.log(req)

    return { 
      statusCode: 200, 
      body: JSON.stringify({ mem: req }) 
    }
  } catch (err) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: err.message}) 
    }
  }

  // const req = await faunaClient.query(q.Create(q.Ref("classes/memories"), memory))

  // console.log(event)
}
