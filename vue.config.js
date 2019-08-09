const path = require('path')

module.exports = {
    css: {
        loaderOptions: {
            stylus: {
                import: [path.resolve(__dirname, './src/assets/styles/**/*.styl')]
            }
        } 
    },
    configureWebpack: {
      devtool: 'source-map'
    }
}
