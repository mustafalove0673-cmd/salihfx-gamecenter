"use client";

import { useState } from "react";

export default function TorchComponent() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="container" onClick={() => setIsOn(!isOn)}>
      <input type="checkbox" checked={isOn} onChange={() => setIsOn(!isOn)} />
      <div className="simple-text">{isOn ? "AÇIK" : "KAPALI"}</div>
      <div className="torch">
        {/* Head - 3D Face */}
        <div className="head">
          <div className="face top">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="face left">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="face right">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        {/* Stick - 3D Body */}
        <div className="stick">
          <div className="side side-left">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="side side-right">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
