const fs = require('fs')

// Gets the package.json file
const package = require('./package.json')

// Gets the package version
const version = package.version

// Splits it by major, minor, build
const split = version.split('.')

// Gets build number
const build = parseInt(split[2])

// Adsd one
const newversion = `${split[0]}.${split[1]}.${build + 1}`

// New package
package.version = newversion

// Writes the new Package json file.
fs.writeFileSync('package.json', JSON.stringify(package, null, 2))

console.log(`Package.json file updated to version ${newversion}`)