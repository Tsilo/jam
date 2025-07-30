let audioContext;
const oscillators = new Map();

function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

// Map note numbers to frequencies (A4 = 440Hz)
function getNoteFrequency(noteNumber) {
  // A4 is note number 69 in MIDI (440Hz)
  // For white keys (1-21): C3 (48) to B4 (71)
  // For black keys (100+): C#3 (49) to A#4 (70)
  const midiNote = noteNumber < 100 ? noteNumber + 47 : noteNumber - 51;
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

// Play a note with the given note number and velocity (0-1)
function playNote(noteNumber, velocity = 0.5) {
  const audioCtx = initAudioContext();

  // Don't play if audio context is suspended
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  // Stop any existing oscillator for this note
  stopNote(noteNumber);

  // Create oscillator and gain node
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  // Configure oscillator
  oscillator.type = "sine";
  oscillator.frequency.value = getNoteFrequency(noteNumber);

  // Configure gain (volume) with attack and release
  const now = audioCtx.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(velocity, now + 0.02); // Quick attack
  gainNode.gain.linearRampToValueAtTime(0, now + 1); // Release over 1 second

  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // Start oscillator
  oscillator.start();

  // Store reference to stop later
  oscillators.set(noteNumber, { oscillator, gainNode, audioCtx });

  // Auto-cleanup after note finishes
  setTimeout(() => {
    stopNote(noteNumber);
  }, 800);
}

// Stop a specific note
function stopNote(noteNumber) {
  const note = oscillators.get(noteNumber);
  if (note) {
    const { oscillator, gainNode } = note;

    // Smooth release
    const now = note.audioCtx.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.1);

    // Schedule oscillator stop after release
    oscillator.stop(now + 0.1);

    // Clean up
    oscillators.delete(noteNumber);
  }
}

// Stop all playing notes
function stopAllNotes() {
  oscillators.forEach((_, noteNumber) => stopNote(noteNumber));
}

export { playNote, stopNote, stopAllNotes };
