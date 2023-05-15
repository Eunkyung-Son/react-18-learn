import { useState, useTransition, memo } from "react";
import sleep from "../utils/sleep";
import { list } from "./list";

function ConcurrentTransition() {
  // 이 상태는 우선순위가 "높은" 업데이트에 의해
  // 업데이트됩니다.
  const [filter, setFilter] = useState("");
  // 이 상태는 우선순위가 "낮은" 업데이트에 의해
  // 업데이트됩니다.
  const [delayedFilter, setDelayedFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="container">
      <input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          startTransition(() => {
            // 여기서 `delayedFilter`의 값을 변경하는
            // 우선순위가 낮은 업데이트를
            // 트리거 합니다.
            setDelayedFilter(e.target.value);
          });
        }}
      />

      {/*
       * isPending을 사용해 트랜지션이
       * 보류 중임을 알릴 수 있습니다.
       */}

      {isPending && "Recalculating..."}

      <List filter={delayedFilter} />
    </div>
  );
}

// 이제 List가 메모이징된다는 것을 알 수 있습니다.
const List = memo(({ filter }: { filter: any }) => {
  const filteredList = list.filter((entry) =>
    entry.name.toLowerCase().includes(filter.toLowerCase())
  );

  sleep(100);

  return (
    <ul>
      {filteredList.map((item) => (
        <li key={item.id}>
          {item.name} - ${item.price}
        </li>
      ))}
    </ul>
  );
});

export default ConcurrentTransition;
