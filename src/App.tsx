import Concurrent from "./concurrent/ConcurrentTransition";
import Sleep from "./concurrent/Sleep";
import SynchronousRendering from "./concurrent/SynchronousRendering";
import ConcurrentListFiltering from "./concurrent/ConcurrentListFiltering";

export default function App() {
  return (
    <>
      {/* <Sleep /> */}
      {/* <SynchronousRendering /> */}
      <ConcurrentListFiltering />
    </>
  );
}
