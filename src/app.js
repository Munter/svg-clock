import { useState } from '/web_modules/preact/hooks/dist/hooks.module.js';
import useAnimationFrame from './useAnimationFrame.js';
import html from './html.js';

import Clock from './clock.js';

function app() {
  const [time, setTime] = useState(new Date());
  const [usesFluidRotation, setFluidRotation] = useState(true);
  const [isLive, setIsLive] = useState(true);
  const [showSecondsHand, setShowSecondsHand] = useState(true);

  useAnimationFrame(function() {
    if (isLive) {
      setTime(new Date());
    }
  });

  function set(type, e) {
    const value = Number(e.target.value);
    const newDate = new Date(time);

    const setterFnName = `set${type[0].toUpperCase()}${type.slice(1)}`;
    newDate[setterFnName](value);

    setIsLive(false);
    setTime(newDate);
  }

  return html`
    <${Clock}
      showSeconds=${showSecondsHand}
      fluid=${usesFluidRotation}
      dateTime=${time}
      style="width: 512pt"
    />

    <form>
      <fieldset>
        <legend>Clock settings</legend>

        <label>
          <input
            type="checkbox"
            checked=${isLive}
            onChange=${e => setIsLive(e.target.checked)}
          />
          Realtime updates
        </label>

        <label>
          <input
            type="checkbox"
            checked=${usesFluidRotation}
            onChange=${e => setFluidRotation(e.target.checked)}
          />
          Fluid hand movement
        </label>

        <label>
          <input
            type="checkbox"
            checked=${showSecondsHand}
            onChange=${e => setShowSecondsHand(e.target.checked)}
          />
          Show seconds hand
        </label>
      </fieldset>

      <fieldset>
        <legend>Manual time settings (chaning stops realtime updates)</legend>

        <label>
          <p>Hour: ${time.getHours()}</p>
          <input
            type="range"
            min="0"
            max="23"
            step="1"
            onInput=${set.bind(null, 'hours')}
            value=${time.getHours()}
          />
        </label>

        <label>
          <p>Minute: ${time.getMinutes()}</p>
          <input
            type="range"
            min="0"
            max="59"
            step="1"
            onInput=${set.bind(null, 'minutes')}
            value=${time.getMinutes()}
          />
        </label>

        <label>
          <p>Second: ${time.getSeconds()}</p>
          <input
            type="range"
            min="0"
            max="59"
            step="1"
            onInput=${set.bind(null, 'seconds')}
            value=${time.getSeconds()}
          />
        </label>
      </fieldset>
    </form>
  `;
}

export default app;
