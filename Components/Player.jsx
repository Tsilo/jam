import React, { useState, useEffect } from "react";
import { useUsersStore } from "../stores/useUsersStore.js";
import { usePianoStore } from "../stores/usePianoStore.js";
import { playNote } from "../utils/audioUtils";

const Piano = () => {
  const me = useUsersStore((state) => state.me);
  const sendToAllUsers = useUsersStore((state) => state.sendToAllUsers);
  const peerKeys = usePianoStore((state) => state.pressedKey);
  useEffect(() => {
    if (peerKeys) {
      handleKey(peerKeys.keyNumber, peerKeys.color, false);
    }
  }, [peerKeys]);

  const fillColor = me?.color || "#3B82F6";

  const [pressedKeys, setPressedKeys] = useState(new Map());
  const [currentOctave, setCurrentOctave] = useState(1);

  const handleKey = (keyNumber, color, send = true) => {
    // Play the note
    playNote(keyNumber);

    // Add visual feedback
    setPressedKeys((prev) => {
      let tmp = new Map(prev);
      tmp.set(keyNumber, color || fillColor);
      return tmp;
    });

    // Remove the visual effect after a short delay
    setTimeout(() => {
      setPressedKeys((prev) => {
        const newSet = new Map(prev);
        newSet.delete(keyNumber);
        return newSet;
      });
    }, 200);
    if (send) {
      sendToAllUsers({
        type: "key-pressed",
        payload: { keyNumber, color: fillColor },
      });
    }
    console.log(`Key ${keyNumber} pressed with color ${fillColor}`);
  };

  const handleMouseKey = (keyNumber, event) => {
    event.preventDefault();
    handleKey(keyNumber);
  };

  // Generate white keys for 3 octaves (C3 to B5)
  const generateWhiteKeys = () => {
    const whiteKeys = [];
    const whiteKeyWidth = 40;
    const whiteKeyHeight = 180;
    const startX = 20;

    // 3 octaves = 21 white keys (7 per octave)
    for (let i = 0; i < 21; i++) {
      const x = startX + i * whiteKeyWidth;
      const keyNumber = i + 1;
      whiteKeys.push(
        <rect
          key={`white-${keyNumber}`}
          x={x}
          y={30}
          width={whiteKeyWidth - 1}
          height={whiteKeyHeight}
          fill={
            pressedKeys.has(keyNumber)
              ? pressedKeys.get(keyNumber) || fillColor
              : "#FFFFFF"
          }
          stroke="#D1D5DB"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-150 "
          onClick={(e) => handleMouseKey(keyNumber, e)}
        />,
      );
    }

    return whiteKeys;
  };

  // Generate black keys for 3 octaves
  const generateBlackKeys = () => {
    const blackKeys = [];
    const whiteKeyWidth = 40;
    const blackKeyWidth = 24;
    const blackKeyHeight = 120;
    const startX = 20;

    // Black key pattern: 2-3-2-3... (skip after E and B)
    const blackKeyPattern = [1, 2, 4, 5, 6]; // Positions within each octave

    for (let octave = 0; octave < 3; octave++) {
      blackKeyPattern.forEach((position, index) => {
        const whiteKeyIndex = octave * 7 + position - 1;
        const x =
          startX +
          whiteKeyIndex * whiteKeyWidth +
          (whiteKeyWidth - blackKeyWidth / 2);
        const keyNumber = 100 + octave * 5 + index; // Start black keys at 100

        blackKeys.push(
          <rect
            key={`black-${keyNumber}`}
            x={x}
            y={30}
            width={blackKeyWidth}
            height={blackKeyHeight}
            fill={
              pressedKeys.has(keyNumber)
                ? pressedKeys.get(keyNumber) || fillColor
                : "#1F2937"
            }
            className="cursor-pointer transition-all duration-150"
            onClick={(e) => handleMouseKey(keyNumber, e)}
          />,
        );
      });
    }

    return blackKeys;
  };

  // Keyboard mapping with octave switching
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Octave switching
      if (event.code === "Digit1") {
        setCurrentOctave(1);
        return;
      }
      if (event.code === "Digit2") {
        setCurrentOctave(2);
        return;
      }
      if (event.code === "Digit3") {
        setCurrentOctave(3);
        return;
      }

      const whiteKeyMap = {
        KeyA: 0, // C
        KeyS: 1, // D
        KeyD: 2, // E
        KeyF: 3, // F
        KeyG: 4, // G
        KeyH: 5, // A
        KeyJ: 6, // B
        KeyK: 7, // C (next octave start)
        KeyL: 8, // D
        Semicolon: 9, // E
      };

      const blackKeyMap = {
        KeyW: 0, // C#
        KeyE: 1, // D#
        KeyT: 2, // F#
        KeyY: 3, // G#
        KeyU: 4, // A#
        KeyI: 5, // C# (next octave)
        KeyO: 6, // D#
      };

      const whiteKeyOffset = whiteKeyMap[event.code];
      const blackKeyOffset = blackKeyMap[event.code];

      let pianoKey = null;

      if (whiteKeyOffset !== undefined && !event.repeat) {
        // Calculate white key number based on current octave
        pianoKey = (currentOctave - 1) * 7 + whiteKeyOffset + 1;
        // Ensure we don't go beyond our 21 white keys
        if (pianoKey <= 21) {
          handleKey(pianoKey);
        }
      } else if (blackKeyOffset !== undefined && !event.repeat) {
        // Calculate black key number based on current octave
        pianoKey = 100 + (currentOctave - 1) * 5 + blackKeyOffset;
        // Ensure we don't go beyond our 15 black keys
        if (pianoKey <= 114) {
          handleKey(pianoKey);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentOctave, fillColor]);

  return (
    <div tabIndex="1" className="flex flex-col justify-center items-center">
      <div className="px-2 pt-2 w-full">
        <svg
          viewBox={`0 0 ${21 * 40 + 40} 240`}
          className="bg-gray-200 rounded-lg w-full"
        >
          {/* Piano body */}
          <rect
            x={10}
            y={10}
            width={21 * 40 + 20}
            height={220}
            fill="#fff"
            rx={8}
            className="drop-shadow-lg"
          />

          {/* White keys */}
          {generateWhiteKeys()}

          {/* Black keys (rendered on top) */}
          {generateBlackKeys()}

          {/* Key labels for first octave */}
          <g className="fill-gray-400 text-xs pointer-events-none">
            <text x={40} y={200} textAnchor="middle">
              C
            </text>
            <text x={80} y={200} textAnchor="middle">
              D
            </text>
            <text x={120} y={200} textAnchor="middle">
              E
            </text>
            <text x={160} y={200} textAnchor="middle">
              F
            </text>
            <text x={200} y={200} textAnchor="middle">
              G
            </text>
            <text x={240} y={200} textAnchor="middle">
              A
            </text>
            <text x={280} y={200} textAnchor="middle">
              B
            </text>
          </g>

          {/* Octave markers with highlighting */}
          <g className="fill-gray-500 text-sm">
            <text
              x={160}
              y={225}
              textAnchor="middle"
              className={currentOctave === 1 ? "fill-blue-500 font-bold" : ""}
            >
              Octave 1
            </text>
            <text
              x={440}
              y={225}
              textAnchor="middle"
              className={currentOctave === 2 ? "fill-blue-500 font-bold" : ""}
            >
              Octave 2
            </text>
            <text
              x={720}
              y={225}
              textAnchor="middle"
              className={currentOctave === 3 ? "fill-blue-500 font-bold" : ""}
            >
              Octave 3
            </text>
          </g>
        </svg>
      </div>

      {/* Instructions */}
      <div className="my-1 text-center text-gray-300 flex items-center gap-4 text-xs">
        <p className="">Keyboard Controls:</p>

        <span className="bg-gray-800 px-2 py-1 rounded">
          A S D F G H J K L ;
        </span>
        <span className="bg-gray-800 px-2 py-1 rounded">
          W E T Y U I O (black keys)
        </span>
        <span className="bg-blue-600 px-2 py-1 rounded">
          1 2 3 (octave switch)
        </span>
      </div>
    </div>
  );
};

export default Piano;
