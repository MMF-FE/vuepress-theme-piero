/**
 * @description 处理 tsconfig 文，用于插入项目别名
 * @author: minfive
 * @createDate: 2018-11-29
 * @lastModify minfive
 * @lastDate: 2018-11-29
 */

const fs = require('fs')
const path = require('path')
const tsconfig = require('../tsconfig.json')
const alias = require('./alias')

function processTsconfig() {
    const compilerOptions = tsconfig.compilerOptions || {}
    compilerOptions.paths = Object.keys(alias).reduce((paths, key) => {
        paths[`${key}/*`] = [`${alias[key]}/*`]
        return paths
    }, {})
    tsconfig.compilerOptions = compilerOptions

    fs.writeFileSync(
        path.resolve(__dirname, '../tsconfig.json'),
        JSON.stringify(tsconfig, null, 4)
    )
}

processTsconfig()
