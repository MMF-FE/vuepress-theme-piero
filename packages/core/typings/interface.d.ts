declare namespace Core {
    interface BaseObject<T = any> {
        [k: string]: T
    }
}