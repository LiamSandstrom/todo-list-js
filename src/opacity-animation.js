export function opacityAnimation(obj, time) {
    const keyframes = [
        {opacity : 0},
        {opacity : 1}
    ]

    const timing = {
        duration : time,
        fill : "forwards"
    }

    obj.animate(keyframes, timing)
}
