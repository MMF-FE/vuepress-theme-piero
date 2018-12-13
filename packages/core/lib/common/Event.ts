import { throttleFunc } from './utils'
import { EventType } from './enums'

type EventName = EventType.Scroll | EventType.Resize

const THROTTLE_TIME = 10

export default class Event {
    private scrollHandlerQueue: Function[] = []
    private resizeHandlerQueue: Function[] = []

    public init() {
        this.initResizeHandler()
        this.initScrollHandler()
    }

    public addEventListener(event: EventName, handler: Function) {
        switch(event) {
            case EventType.Resize:
                this.addHandler(this.resizeHandlerQueue, handler)
                break
            case EventType.Scroll:
                this.addHandler(this.scrollHandlerQueue, handler)
                break
        }
    }

    public removeEventListener(event: EventName, handler: Function) {
        switch(event) {
            case EventType.Resize:
                this.removeHandler(this.resizeHandlerQueue, handler)
                break
            case EventType.Scroll:
                this.removeHandler(this.scrollHandlerQueue, handler)
                break
        }
    }

    private initScrollHandler() {
        document.addEventListener('scroll', throttleFunc(() => this.handleScroll(), THROTTLE_TIME))
    }

    private initResizeHandler() {
        window.addEventListener('resize', throttleFunc(() => this.handleResize(), THROTTLE_TIME))
    }

    private handleResize() {
        this.resizeHandlerQueue.forEach(handler => {
            try {
                handler()
            } catch(err) {
                console.error('[GolbalEvent]: resize handler error')
                console.error(err)
            }
        })
    }

    private handleScroll() {
        this.scrollHandlerQueue.forEach(handler => {
            try {
                handler()
            } catch(err) {
                console.error('[GolbalEvent]: scroll handler error')
                console.error(err)
            }
        })
    }

    private addHandler(queue: Function[], handler: Function) {
        queue.push(handler)
    }

    private removeHandler(queue: Function[], handler: Function) {
        const idx = queue.findIndex(item => item === handler)

        if (~idx) {
            queue.splice(idx)
        }
    }
}