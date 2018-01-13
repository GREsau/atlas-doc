const register = require('babel-register')

const nodeMajorVersion = parseInt(process.version.match(/\d+/)[0])
if (nodeMajorVersion < 6) {
  register({
    // adf-builder uses default parameters which are not supported in node <6,
    // so ensure adf-builder is transpiled by babel
    ignore: path => (path.includes('node_modules') && !path.includes('adf-builder'))
  })
}
