module.exports.pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
