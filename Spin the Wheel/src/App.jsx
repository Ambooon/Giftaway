import React, { useState } from "react";
import { SpinWheel } from "spin-wheel-game";
import SegmentManager from "./SegmentManager";

function App() {
  const [segments, setSegments] = useState([
    { id: 1, segmentText: "Segment 1", segColor: "red" },
    { id: 2, segmentText: "Segment 2", segColor: "blue" },
  ]);

  const [wheelKey, setWheelKey] = useState(0);

  const updateSegments = (newSegments) => {
    setSegments(newSegments);
    setWheelKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold mb-4">Spin The Wheel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">

        <div className="bg-white shadow-md rounded-lg p-4 h-[500px] overflow-hidden">
          <SegmentManager segments={segments} setSegments={updateSegments} />
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-center">
          <SpinWheel
            key={wheelKey}
            segments={segments}
            onFinished={(result) => alert(`Spun to: ${result}`)}
            size={250}
            upDuration={100}
            downDuration={600}
            arrowLocation="top"
            isSpinSound={false}
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
}

export default App;
