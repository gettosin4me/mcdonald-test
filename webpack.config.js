module.exports = (dev) => {
    return require(`./builds/${dev}.js`)
}