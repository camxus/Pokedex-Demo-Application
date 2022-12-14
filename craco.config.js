const path = require('path')

module.exports = {
  reactScriptsVersion: 'react-scripts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ['node_modules', 'src/assets']
        }
      }
    }
    // postcss: {
    //   plugins: [require('postcss-rtl')()]
    // }
  },
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/@core/components'),
      '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
      '@styles': path.resolve(__dirname, 'src/@core/scss'),
      '@store': path.resolve(__dirname, 'src/redux'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@utils': path.resolve(__dirname, 'src/utility/Utils'),
      '@hooks': path.resolve(__dirname, 'src/utility/hooks'),
      '@api': path.resolve(__dirname, 'src/pokedex/api'),
      '@pokedex': path.resolve(__dirname, 'src/pokedex/components'),
      '@css': path.resolve(__dirname, 'src/assets/css'),
      '@pages': path.resolve(__dirname, 'src/pages')
    }
  }
}

