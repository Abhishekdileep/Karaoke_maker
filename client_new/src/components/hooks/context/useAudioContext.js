import { createContext, useContext } from "react";

const context = createContext({
  audioContext: new AudioContext({ sampleRate:16000})
});

console.log("Create AudioContext instance");

export default () => useContext(context);
