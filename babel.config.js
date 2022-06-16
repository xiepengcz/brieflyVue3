module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],// 以当前 node 版本转换
    '@babel/preset-typescript',
  ],

};