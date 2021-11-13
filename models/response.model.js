
exports.Response = class Response {
    constructor(code, errorCode, data, message, _message) {
        this.code = code || null
        this.errorCode = errorCode || null
        this.data = data || null
        this._message = _message || null
        this.message = message || null
    }
}
