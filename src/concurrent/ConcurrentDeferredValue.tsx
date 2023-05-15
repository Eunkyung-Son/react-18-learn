import { memo, useDeferredValue, useState } from "react";
import sleep from "../utils/sleep";
import { list } from "./list";

function ConcurrentDeferredValue() {
  // 이 상태는 우선순위가 "높은" 업데이트
  // 에 의해 업데이트됩니다.
  const [filter, setFilter] = useState("");
  // 이 상태는 우선순위가 "낮은" 업데이트
  // 에 의해 업데이트됩니다.
  const deferredFilter = useDeferredValue(filter);

  return (
    <div className="container">
      <input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />

      <List filter={deferredFilter} />
    </div>
  );
}

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

export default ConcurrentDeferredValue;
