import { useState, useTransition, memo } from "react";
import sleep from "../utils/sleep";
import { list } from "./list";

function ConcurrentListFiltering() {
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
          // value를 수정하는 우선순위가 높은 업데이트
          setFilter(e.target.value);
          startTransition(() => {
            // 여기서 `delayedFilter`의 값을 변경하는
            // 우선순위가 낮은 업데이트를
            // 트리거 합니다.
            setDelayedFilter(e.target.value);
          });
          // 함께 트리거
        }}
      />
      {/**
       * 우선 순위가 높은 업데이트가 먼저 처리된 후 낮은 업데이트 처리.
       * 예를들어 t 라는 문자 입력 후에 filter 는 t를 가지지만
       * delayedFilter는 빈 문자열로, 변경되지 않은 상태로 유지가 됨.
       *
       * 결국, 리스트 컴포넌트가 리렌더링 하는 우선순위가 낮은 리렌더링이 완료될 때 까지
       * 리스트 컴포넌트는 최신이 아닌 상태가 됨
       */}

      {/**
       * 가장 중요한 것!!!!
       * 우선순위가 낮은 리렌더링은 우선순위가 높은 업데이트에 의해 중단되는 즉시 버려짐!!!
       * value -> t, -> delaytedFilter "" ->  delaytedFilter t -> 완전 빠르게 a 입력 -> value ta -> delayedFilter ""
       */}
      {/**
       * input 값 업데이트를 완전 빠르게 안하고 한 자 한 자 친다고 가정하면 value와 delayedFilter 는 값이 같아짐.
       * 우선순위가 높은 업데이트가 일어 난 후에 낮은 업데이트가 일어나서, 우선순위가 낮은 업데이트가 씹히지 않음!!
       */}
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

export default ConcurrentListFiltering;
