  export function toggleWidth(obj, startValue, endValue, animTime) {
    startValue = parseInt(startValue);
    endValue = parseInt(endValue);

    const style = window.getComputedStyle(obj);
    const currWidth = parseInt(style.width);
    const keyframes = [{ width: currWidth + "px" }, { width: endValue + "px" }];

    const animPercent = (currWidth - startValue) / (endValue - startValue);
    const animDuration = animPercent == 0 ? animTime : animPercent * animTime;

    const timing = {
      duration: animDuration,
      fill: "forwards",
    };

    obj.animate(keyframes, timing)
  }