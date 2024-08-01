import { DirectiveBinding, VNode } from 'vue'

// Reference: Intersection Observer API
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

// Map to handle properties for each target element
interface ElementData {
    observer?: IntersectionObserver // Intersection Observer for this element
    startTime?: number // Time when isVisible became true
    timeoutId?: NodeJS.Timeout // callback function id
    hasActivated?: boolean // True when it has intersected for longer than set time limit and is currently in intersecting
}
const elementMap: WeakMap<HTMLElement, ElementData> = new WeakMap<
    HTMLElement,
    ElementData
>()

export interface IntersectionDirectiveIF {
    onBegin: (element: HTMLElement) => void,
    onEnd: (element: HTMLElement) => void,
    totalViewTimeThresholdms: number
    observerOptions: IntersectionObserverInit
}

// Default settings if nothing is specified with the directive
const defaultConfig: IntersectionDirectiveIF = {
    onBegin: () => { console.log("onBegin") },
    onEnd: () => { console.log("onEnd") },
    totalViewTimeThresholdms: 0, // Triggered instantly
    observerOptions: { threshold: 0. }, // Triggered for any overlop over 0
}

/* This callback is executed in the following 2 scenarios:
  - The observed element came came into view (changed from not intersecting to intersecting)
  - The observed element got removed from view (changed from intersecting to not intersecting)
 */
function intersectionObserverCallback(
    entries: Array<IntersectionObserverEntry>,
    config: IntersectionDirectiveIF,
) {
    // We only track one target per observer so this should only execute once
    entries.forEach((entry: IntersectionObserverEntry) => {
        // Target element to be observed
        const element = entry.target as HTMLElement

        if (entry.isIntersecting) {
            // Intersecting now -> Target element came into view

            // Execute callback function when element has been visible for totalViewTimeThresholdms
            const timeoutId = setTimeout(() => {
                if (elementMap.get(element)?.timeoutId) {
                    config.onBegin(element)
                    elementMap.set(element, {
                        ...elementMap.get(element),
                        timeoutId: undefined,
                        startTime: undefined,
                        hasActivated: true,
                    })
                }
            }, config.totalViewTimeThresholdms)

            elementMap.set(element, {
                ...elementMap.get(element),
                startTime: entry.time,
                timeoutId,
            })
        } else {
            // Not intersecting now -> Target element got removed from view

            // element was active -> execute onEndIntersecti
            elementMap.get(element)?.hasActivated && config.onEnd(element)

            // The above timeout will call the eventDispatcher callback after totalViewTimeThresholdms have lapsed
            // If the target element leaves the view, we want to cancel this timeout so the eventDispatcher is not executed
            clearTimeout(elementMap.get(element)?.timeoutId)
            elementMap.set(element, {
                ...elementMap.get(element),
                timeoutId: undefined,
                startTime: undefined,
                hasActivated: false,
            })
        }
    })
}

export const IntersectionDirective = {
    mounted(el: HTMLElement, binding: DirectiveBinding, _vnode: VNode) {
        // Create configuration from defaults and passed in values
        const config: IntersectionDirectiveIF = Object.assign(
            {},
            defaultConfig,
            binding.value,
        )

        console.log("directive!")

        // Create Intersection Observer
        const observer = new IntersectionObserver(
            (entries: Array<IntersectionObserverEntry>) =>
                intersectionObserverCallback(entries, config),
            config.observerOptions,
        )

        // Start observing element and register this mapping
        observer.observe(el)
        elementMap.set(el, { observer })
    },

    unmounted(el: HTMLElement) {
        // Cleanup -> disconnect observer from element and delete entry in map
        const observer = elementMap.get(el)?.observer
        observer?.disconnect()
        elementMap.delete(el)
    },
}

const INTERSECT_HANDLER_NAME = 'intersect' // use directive as "v-intersect"
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive(INTERSECT_HANDLER_NAME, IntersectionDirective)
})
