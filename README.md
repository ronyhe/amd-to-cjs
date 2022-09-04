# amd-to-cjs
[![build](https://github.com/ronyhe/amd-to-cjs/actions/workflows/build.yml/badge.svg?event=push)](https://github.com/ronyhe/amd-to-cjs/actions/workflows/build.yml)

This package transforms AMD source code to commonjs format.
It'll transform this:
```javascript
define(['a', 'b'], (a, b) => ({ export1: a, export2: b }))
```
to:
```javascript
module.exports = ((a, b) => ({
  export1: a,
  export2: b
}))(require('a'), require('b'));//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm1hcHBpbmdzIjoiIn0=
```

# Code Usage
```javascript
import fs from 'node:fs/promises'
import {convert} from 'amd-to-cjs'

const source = await fs.readFile('yourAmdModule.js')
const converted = convert(source, 'yourAmdModule.js')

await fs.writeFile('nowCommon.cjs', converted)
```

# Plugin Usage
The code in this repo was originally created in order to get [esbuild](https://esbuild.github.io/) to handle AMD files.
It can work as a plugin for other build pipelines as well, which will enable you to use modern tools on your legacy AMD modules.
```javascript
import fs from 'node:fs/promises'
import path from 'node:path'
import {convert} from 'amd-to-cjs'

const esubildPlugin = {
    name: 'example-esbuild-plugin-amd-to-cjs',
    setup(build) {
      build.onLoad({filter: /your-amd-directories/}, async args => {
        const source = await fs.readFile(args.path)
        const converted = convert(source, path.basename(args.path))
        return {contents: converted}
      })    
    }
}
```

# Possible future enhancements:
- [esbuild](https://esbuild.github.io/) plugin that uses this code
- Configuration options:
  - Parser options
  - Custom parser
  - Disable sourcemaps
  - Change output style to static requires at top of file
- CLI for bulk migration of code-bases

# Acknowledgements
As with most code projects, this one builds upon too many other projects to count.
Without taking away from others' contribution, here are some prominent takeaways:
- [Wix.com](https://www.wix.com) - The company I work for and for which this was originally developed
- [esbuild](https://esbuild.github.io/) - A great build tool. This transformation was originally written in order to be able to use esbuild in our codebase at wix
- [Sindre Sorhus](https://sindresorhus.com/) - An amazingly productive open source programmer. His code, with slight modification, is used in this repo. See `src/sourceConversion.mjs`
