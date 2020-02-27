// Adapted from https://css-tricks.com/using-requestanimationframe-with-react-hooks/

import {
  useRef,
  useLayoutEffect
} from '/web_modules/preact/hooks/dist/hooks.module.js';

const useAnimationFrame = callback => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const loop = () => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  };

  const frameRef = useRef();
  useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};

export default useAnimationFrame;
