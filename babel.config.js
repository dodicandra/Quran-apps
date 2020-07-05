module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ios.tsx',
          '.android.tsx',
          '.ts',
          '.d.ts',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          'config.json'
        ],
        alias: {
          screens: './src/Screen',
          router: './src/router',
          components: './src/Components',
          utils: './src/utils',
          assets: ['./src/assets']
        }
      }
    ]
  ]
};
