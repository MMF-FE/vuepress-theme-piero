/* eslint-disable no-useless-escape */
import Flexsearch from 'flexsearch/flexsearch'
import CONSTANT from '@dynamic/plugin-flexsearch-constant'
import { Segment, useDefault } from 'segmentit'

const segmentit = useDefault(new Segment())

function deepClone(target) {
    return JSON.parse(JSON.stringify(target))
}

function tokenize(str) {
    let s = str.replace(/^\s+/, '')

    for (var i = s.length - 1; i >= 0; i--) {
        if (/\S/.test(s.charAt(i))) {
            s = s.substring(0, i + 1)
            break
        }
    }

    return s
        .split(
            /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\uFE30-\uFFA0|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]+/
        )
        .map((token) => {
            var t = token
                .replace(
                    /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\uFE30-\uFFA0|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,
                    ''
                )
                .toLowerCase()
            return t
        })
        .reduce((res, token) => {
            let tokens = [token]

            // eslint-disable-next-line no-control-regex
            if (token.replace(/[\x00-\x7F]/g, '').trim() !== '') {
                tokens = segmentit.doSegment(token).map(i => i.w)
            }
            return res.concat(tokens)
        }, [])
}

class Plugin extends Flexsearch {
    constructor() {
        super({
            ...deepClone(CONSTANT.options),
            depth: 0,
            tokenize
        })

        this._isInit = false
        this._store = null
    }

    async initSearch() {
        if (this._isInit) return true
        const info = await fetch(`/${CONSTANT.fileName}`).then((response) =>
            response.json()
        )
        this.import(info.index)
        this._store = info.store
        this._isInit = true
    }

    search(query) {
        return super.search(query).map((item) => this._store[item.key])
    }
}

export default ({ Vue }) => {
    Vue.mixin({
        computed: {
            $flexsearch() {
                return new Plugin()
            }
        }
    })
}
