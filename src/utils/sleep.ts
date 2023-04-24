/**
 * @description
 * cpu를 많이 사용하는 작업을 시뮬레이션 하기 위해
 * 메인 스레드를 동기적으로 차단해주는 함수
 * @param ms
 */
const sleep = (ms: number) => {
  const start = performance.now();

  while (performance.now() - start < ms);
};

export default sleep;
