import { useState, useEffect, useDeferredValue, useTransition } from "react";

const fetchData = () => {
  // 네트워크 요청을 시뮬레이션하기 위해 Promise를 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data loaded!");
    }, 2000);
  });
};

function Example() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const deferredData = useDeferredValue(data);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isLoading) {
      startTransition(() => {
        fetchData().then((result) => {
          setData(result);
          setIsLoading(false);
        });
      });
    }
  }, [isLoading, startTransition]);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? "Loading..." : "Load"}
      </button>
      {isPending ? "Loading..." : deferredData}
    </div>
  );
}

export default Example;
