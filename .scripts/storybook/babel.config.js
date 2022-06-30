module.exports = function (api) {
  api.cache(true)

  return {
    plugins: [
      [
        'module-resolver',
        {
          root: ['../../src'],
          alias: {
            static: '../../public/static'
          }
        }
      ],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }]
    ],
    presets: ['next/babel', 'linaria/babel']
  }
}
