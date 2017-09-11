import MockHTTPService from "./MockHTTPService"
import MockDBService from "./MockDBService"

const TodoMVCService = new MockHTTPService()
const db = new MockDBService()

const TODOS = "todos"

db.initTable(TODOS)

const { router } = TodoMVCService

router.on("GET", "/todos/:id", (req, res, params) => {
  const id = params.id
  const item = db.getItem(TODOS, id)
  if (!item) return res.status(404).send()
  res.status(200).send(item)
})

router.on("PUT", "/todos/:id", (req, res, params) => {
  const id = params.id
  const data = req.body
  const item = db.updateItem(TODOS, id, data)
  if (!item) return res.status(404).send()
  res.status(200).send(item)
})

router.on("DELETE", "/todos/:id", (req, res, params) => {
  const id = params.id
  const item = db.deleteItem(TODOS, id)
  if (!item) return res.status(404).send()
  res.status(204).send(item)
})

router.on("GET", "/todos", (req, res) => {
  const todos = db.listItems(TODOS)
  res.status(200).send(todos)
})

router.on("POST", "/todos", (req, res) => {
  const data = req.body
  const item = db.createItem(TODOS, data)
  res.status(200).send(item)
})

export default TodoMVCService
