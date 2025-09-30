import { onMounted } from "vue"
import mediumZoom from "medium-zoom"

export default function useZoom() {
    onMounted(() => {
        mediumZoom(".zoomable", {
            background: "transparent",
            margin: 0,
            scrollOffset: 0,
        })
    })
}