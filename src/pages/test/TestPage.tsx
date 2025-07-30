import { useEffect, useRef } from 'react';

const intersectionCallback = (entries: any, callback: any) => {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
      callback()
    }
  });
}

const callback = () => console.log("---- hitting bottom")

const TestPage = () => {
  const bottomRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => intersectionCallback(entries, callback), {
      threshold: 0.75
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-4 h-full overflow-scroll">
      <h1 className="text-2xl font-bold mb-4">Scroll Down to Bottom</h1>

      {Array.from({ length: 50 }, (_, i) => (
        <div key={i} className="p-4 mb-2 bg-gray-100 rounded">
          Item {i + 1}
        </div>
      ))}

      <div
        ref={bottomRef}
        className="h-20 bg-red-200 flex items-center justify-center">
        Bottom Element (Check Console)
      </div>
    </div>
  );
}

export default TestPage