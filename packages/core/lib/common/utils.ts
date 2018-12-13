export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^(https?:|mailto:|tel:)/

export function normalize(path: string): string {
    return decodeURI(path)
        .replace(hashRE, '')
        .replace(extRE, '')
}

export function getHash(path: string): string | void {
    const match = path.match(hashRE)
    if (match) {
        return match[0]
    }
}

export function isExternal(path: string): boolean {
    return outboundRE.test(path)
}

export function isMailto(path: string): boolean {
    return /^mailto:/.test(path)
}

export function isTel(path: string): boolean {
    return /^tel:/.test(path)
}

export function ensureExt(path: string): string {
    if (isExternal(path)) {
        return path
    }
    const hashMatch = path.match(hashRE)
    const hash = hashMatch ? hashMatch[0] : ''
    const normalized = normalize(path)

    if (endingSlashRE.test(normalized)) {
        return path
    }

    return normalized + '.html' + hash
}

// 获取基本类型
export function getBaseType(target: any): string {
    return Object.prototype.toString
        .call(target)
        .replace(/\[object (.+)\]/g, '$1')
}

// 函数节流
export function throttleFunc(func: Function, gapTime: number): EventListener {
    let lastTime: number

    return function fun(this: ThisType<typeof fun>, ...args: Event[]): void {
        let nowTime = Date.now()

        if (nowTime - lastTime > gapTime || !lastTime) {
            func.apply(this, args)
            lastTime = nowTime
        }
    }
}

// 函数防抖
export function debounceFunc(
    func: Function,
    gapTime: number
): Function | EventListener {
    let timer: number

    return function fun(this: ThisType<typeof fun>, ...args) {
        clearTimeout(timer)
        timer = window.setTimeout(() => {
            func.apply(this, args)
        }, gapTime)
    }
}

// 获取节点相对与 document 的位置
export function offsetOfDocument(
    ele: HTMLElement
): {
        x: number
        y: number
    } {
    if (!ele.offsetParent) {
        return {
            x: ele.offsetLeft,
            y: ele.offsetTop
        }
    } else {
        let parentOffset = offsetOfDocument(ele.offsetParent as HTMLElement)

        return {
            x: ele.offsetLeft + parentOffset.x,
            y: ele.offsetTop + parentOffset.y
        }
    }
}

// 取随机值
export function randomStr(len = 7): string {
    const DECIMAL = 36

    return Math.random()
        .toString(DECIMAL)
        .substring(len)
        .split('')
        .join('.')
}

// 数组去重
export function unique(
    targetArr: Array<string | number>
): Array<string | number> {
    return Array.from(new Set(targetArr))
}

export function sleep(time = 0): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

type ITplData = Core.BaseObject<string>

// 模版引擎
export function compileTemplate(tpl: string, data: ITplData | ITplData[]): string {
    const keyArr = tpl.match(/\{\{\s(\S+)\s\}\}/g) || []
    const keys: string[] = []
    let result = ''

    function compile(item: ITplData): void {
        let rs = tpl

        for (let i = 0; i < keyArr.length; i++) {
            rs = rs.replace(/\{\{\s(\S+)\s\}\}/, item[keys[i]])
        }

        result = rs + result
    }

    keyArr.forEach((key, index) => {
        keys.push(keyArr[index].replace(/\{\{\s(\S+)\s\}\}/, '$1'))
    })

    if (Array.isArray(data)) {
        data.forEach((item) => compile(item))
    } else {
        compile(data)
    }

    return result
}

// 序列化表单数据
export function serialize(elements: HTMLFormControlsCollection) {
    const params: Core.BaseObject<string> = {}

    Object.values(elements)
        .forEach(value => {
            const ele = value as HTMLInputElement
            const name = ele.name
    
            params[name] = ele.value
        })

    return params
}
