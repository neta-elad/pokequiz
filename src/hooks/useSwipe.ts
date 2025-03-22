import { DependencyList, useEffect } from "react";

export default function useSwipe(
  onSwipeRight: () => Promise<void> | void,
  onSwipeLeft: () => Promise<void> | void,
  deps?: DependencyList,
  minSwipeDistance: number = 50,
) {
  useEffect(() => {
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      endX = startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      endX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const distance = endX - startX;
      if (distance > minSwipeDistance) {
        onSwipeRight();
      } else if (distance < -minSwipeDistance) {
        onSwipeLeft();
      }
    };

    document.body.addEventListener("touchstart", handleTouchStart);
    document.body.addEventListener("touchmove", handleTouchMove);
    document.body.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.body.removeEventListener("touchstart", handleTouchStart);
      document.body.removeEventListener("touchmove", handleTouchMove);
      document.body.removeEventListener("touchend", handleTouchEnd);
    };
  }, deps);
}
