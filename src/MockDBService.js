class MockDBService {
  constructor(sessionOnly) {
    this.indices = {}
    this.tables = {}
    this.db = sessionOnly ? sessionStorage : localStorage
  }

  initTable(tableName) {
    const table = JSON.parse(this.db.getItem(tableName)) || {}
    this.tables[tableName] = table
    this.saveTable(tableName)
  }

  saveTable(tableName) {
    const table = this.tables[tableName]
    this.db.setItem(tableName, JSON.stringify(table))
  }

  createItem(tableName, data) {
    const item = {
      ...data,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      _deleted: false,
    }
    this.tables[tableName][item.id] = item
    this.saveTable(tableName)
    return item
  }

  getItem(tableName, id) {
    const item = this.tables[tableName][id]
    return item || null
  }

  updateItem(tableName, id, data) {
    const item = this.tables[tableName][id]
    if (!item) return null
    const newItem = {
      ...item,
      ...data,
      updatedAt: new Date(),
    }
    this.tables[tableName][id] = newItem
    this.saveTable(tableName)
    return newItem
  }

  deleteItem(tableName, id) {
    const item = this.tables[tableName][id]
    if (!item) return null
    const newItem = {
      ...item,
      updatedAt: new Date(),
      _deleted: true,
    }
    this.tables[tableName][id] = newItem
    this.saveTable(tableName)
    return newItem
  }

  listItems(tableName, sortByAttribute = "createdAt") {
    return Object.values(this.tables[tableName]).sort((a, b) => {
      switch (true) {
        case a[sortByAttribute] < b[sortByAttribute]:
          return 1
          break
        case a[sortByAttribute] > b[sortByAttribute]:
          return -1
          break
        default:
          return 0
      }
    })
  }

  deleteTablePermanently(tableName) {
    this.tables[tableName] = null
    this.saveTable(tableName)
  }

  generateId() {
    return `${Date.now()}-${Math.round(1000000 * Math.random())}`
  }
}

export default MockDBService
