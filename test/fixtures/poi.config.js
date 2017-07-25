let options = JSON.parse(process.env.POI_OPTIONS)

module.exports = {
  presets: [require('../../')(options)]
}
