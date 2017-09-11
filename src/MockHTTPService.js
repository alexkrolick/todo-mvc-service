const Router = require("find-my-way")

export class MockHTTPResponse {
  constructor(resolve, reject) {
    this._headersSent = false
    this._data = null
    this._contentType = "application/json"
    this._resolve = resolve
    this._reject = reject
    this._statusCode = 200
  }

  set statusCode(status) {
    this._statusCode = status
  }

  get statusCode() {
    return this._statusCode
  }

  status(statusCode) {
    this._statusCode = statusCode
    return this // for chaining: res.status(400).send()
  }

  get headersSent() {
    return this._headersSent
  }

  get body() {
    return this._data
  }

  get contentType() {
    return this._contentType
  }

  send(data) {
    this._headersSent = true
    this._data =
      this.contentType === "application/json"
        ? JSON.stringify(data)
        : data.toString()
    if (this._statusCode >= 400) return this._reject(this)
    else return this._resolve(this)
  }

  json(data) {
    if (this.headersSent) return JSON.parse(this.body)
    this._contentType = "application/json"
    return this.send(data)
  }

  text(data) {
    if (this.headersSent) return this.body.toString()
    this._contentType = "text/plain"
    return this.send(data)
  }
}

export class MockHTTPRequest {
  constructor({ url, method = "GET", ...options }) {
    Object.assign(this, { url, method, ...options })
  }
}

export class MockHTTPService {
  constructor() {
    this._router = Router({
      defaultRoute: (req, res, params) => {
        res.statusCode = 404
        res.send()
      },
    })
  }

  async randomDelay(minDelay, maxDelay) {
    return new Promise((resolve, reject) => {
      window.setTimeout(
        resolve,
        Math.round(minDelay + (maxDelay - minDelay) * Math.random())
      )
    })
  }

  async fetch(path, options) {
    await this.randomDelay(10, 50)
    return new Promise((resolve, reject) => {
      const req = new MockHTTPRequest({ url: path, ...options })
      const res = new MockHTTPResponse(resolve, reject)
      this.router.lookup(req, res)
    })
  }

  set router(newRouter) {
    this._router = newRouter
  }

  get router() {
    return this._router
  }

  get routes() {
    return this.router.prettyPrint()
  }
}

export default MockHTTPService
