import { useState } from "react";
import { list } from "./list";

export default function App() {
  const [filter, setFilter] = useState("");

  return (
    <div className="container">
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />

      <List filter={filter} />
    </div>
  );
}

const List = ({ filter }: { filter: string }) => {
  const filteredList = list.filter((entry) =>
    entry.name.toLowerCase().includes(filter.toLowerCase())
  );

  // sleep 함수를 호출함으로써 List 렌더링 속도를 인위적으로 늦춘다.
  sleep(100);
  // input에 검색하여, 목록을 가져오는 작업을 할 때 모든 항목을 가져올 때 까지
  // ui가 잠시 멈췄다가 최종 상태로 점프하게 됨.

  return (
    <ul>
      {filteredList.map((item) => (
        <li key={item.id}>
          {item.name} - ${item.price}
        </li>
      ))}
    </ul>
  );
};

// cpu를 많이 사용하는 작업을 시뮬레이션 하기 위해
// 메인 스레드를 동기적으로 차단해주는 함수
const sleep = (ms: number) => {
  const start = performance.now();

  while (performance.now() - start < ms);
};
