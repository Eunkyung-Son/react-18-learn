import Sleep from "./concurrent/Sleep";
import SynchronousRendering from "./concurrent/SynchronousRendering";

export default function App() {
  return (
    <>
      <Sleep />
      <SynchronousRendering />
    </>
  );
}
