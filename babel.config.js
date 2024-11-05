module.exports = {
  presets: [['module:metro-react-native-babel-preset', {
            unstable_disableES6Transforms: true
  }]],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': ['./src/components'],
          '@navigation': ['./src/navigation'],
          '@config': ['./src/config'],
          '@consts': ['./src/consts'],
          '@context': ['./src/context'],
          '@hooks': ['./src/hooks'],
          '@interfaces': ['./src/interfaces'],
          '@providers': ['./src/providers'],
          '@screens': ['./src/screens'],
          '@services': ['./src/services'],
          '@styles': ['./src/styles'],
          '@utils': ['./src/utils'],
          '@assets': ['./src/assets'],
          '@HOCs': ['./src/HOCs'],
          '@redux': ['./src/redux'],
          '@types': ['./src/types'],
          '@i18n': ['./src/i18n']
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', 'json'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
