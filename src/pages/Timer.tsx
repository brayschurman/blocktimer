import React, { useState, useEffect } from "react";

interface TimerProps {
  name: string;
  duration: number;
  isRunning: boolean;
  onToggle: () => void;
}

export default function Timer({
  name,
  duration,
  isRunning,
  onToggle,
}: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [editing, setEditing] = useState({ id: null, field: null });
  const [input, setInput] = useState("");

  useEffect(() => {
    let timerId = null;
    if (isRunning) {
      timerId = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
      }, 1000);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isRunning]);

  const startEditing = (id, field, value) => {
    setEditing({ id, field });
    setInput(value);
  };

  const finishEditing = () => {
    const newTimers = timers.map((timer) => {
      if (timer.id === editing.id) {
        return { ...timer, [editing.field]: input };
      } else {
        return timer;
      }
    });
    console.log("editing", newTimers);
    setTimers(newTimers);
    setEditing({ id: null, field: null });
    setInput("");
  };

  const selectTimer = (id: number) => {
    const newTimers = timers.map((timer) => {
      if (timer.id === id) {
        return { ...timer, selected: true };
      } else {
        return { ...timer, selected: false };
      }
    });
    setTimers(newTimers);
  };

  return (
    // <div onClick={onToggle}>
    //   <h3>{name}</h3>
    //   <div>{timeRemaining}</div>
    // </div>

    <div
      className={`grid max-w-lg cursor-pointer grid-cols-1 gap-4 gap-4 rounded-xl bg-white/10 p-4 
          text-white transition duration-200 ease-in-out hover:bg-white/20 ${
            timer.lastActive ? "bg-white/20 text-3xl" : "text-xl"
          }`}
      key={timer.id}
      onClick={() => selectTimer(timer.id)}
    >
      <div className="text-lg">
        <h3 className="font-mono text-2xl font-bold">
          {editing.id === timer.id && editing.field === "name" ? (
            <input
              type="text"
              className="text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={finishEditing}
              autoFocus
            />
          ) : (
            <div onClick={() => startEditing(timer.id, "name", timer.name)}>
              {timer.name}
            </div>
          )}
        </h3>
        <div>
          {editing.id === timer.id && editing.field === "timeRemaining" ? (
            <input
              type="number"
              className="text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={finishEditing}
              autoFocus
            />
          ) : (
            <div
              onClick={() =>
                startEditing(timer.id, "timeRemaining", timer.duration)
              }
            >
              {timer.timeRemaining}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
