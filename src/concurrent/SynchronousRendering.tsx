import { useState, memo } from "react";
import sleep from "../utils/sleep";

// concurrent 를 사용하지 않는 경우, 컴포넌트를 동기적으로 렌더링 한다.
// 렌더링을 시작한 컴포넌트는 예외를 제외하고는
// 어떤 것도 렌더링을 중단할 수 없다.
// 렌더링이 끝난 후에만 작업을 수행한다.

// 1. input에 텍스트를 작성한다.
// 2. 버튼을 클릭한다.
// 3. <Slow /> 컴포넌트가 리렌더링 된다.
// 4. react는 렌더링 하는 동안 input에 텍스트를 작성한다.

// 자바스크립트가 리액트 컴포넌트를 렌더링 하는 동안 브라우저와 상호작용 할 수 있음에도 불구하고,
// 이 상호작용은 렌더링을 중단시키지 않는다.
// <Slow /> 가 sleep 호출 이후, 콘솔에 로그를 기록하고,
// input 과의 상호작용은 대부분 sleep 이 종료되기 전에 발생하지만,
// input과의 상호작용으로 인해 발생하는 모든 로그가
// slow rendered! 로그 뒤에 나타난다.

// 느린 컴포넌트 렌더링을 시작하면, 느린 컴포넌트 렌더링을 마친 후에야,
// ui의 다른 부분에 대한 새로운 업데이트를 처리할 수 있기 때문에
// 느린 컴포넌트가 ui의 빠른 부분을 차단하게 된다.

// 이 문제를 해결하기 위하여 concurrent를 사용하면 된다!
function SynchronousRendering() {
  const [value, setValue] = useState("");
  const [key, setKey] = useState(Math.random());

  return (
    <div className="container">
      <input
        value={value}
        onChange={(e) => {
          console.log(
            `%c Input changed! -> "${e.target.value}"`,
            "color: yellow;"
          );
          setValue(e.target.value);
        }}
      />

      {/* 
        임의의 숫자를 <Slow /> 의 키로 사용.
        메모이징 되었더라도 이 버튼을 클릭할 때마다 리렌더링 된다.
      */}
      <button onClick={() => setKey(Math.random())}>Render Slow</button>

      <Slow key={key} />
    </div>
  );
}

/**
 * 이 컴포넌트를 메모이징 해 입력이 변경돼도 리렌더링 되지 않게 한다.
 */
const Slow = memo(() => {
  sleep(2000);

  console.log("%c Slow rendered!", "color: teal;");

  return <></>;
});

export default SynchronousRendering;
