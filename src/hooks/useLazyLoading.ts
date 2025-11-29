import { useEffect, useRef, useState } from "react";

export function useLazyLoadList<T>(items: T[], batchSize: number = 6) {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(batchSize);
  }, [items, batchSize]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + batchSize);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [batchSize]);

  const visibleItems = items.slice(0, visibleCount);

  return {
    visibleItems,
    loadMoreRef,
  };
}

// const { visibleItems, loadMoreRef } = useLazyLoadList<tipagem>(elemento, n°itens por vez);
// <div ref={ loadMoreRef } className = "h-10" > </div>
