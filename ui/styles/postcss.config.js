module.exports = {
  plugins: [
    require('postcss-import')({
      plugins: [require('postcss-nested')(), require('cssnano')()]
    })
  ]
}
