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
          <span>Realtime updates</span>
        </label>

        <label>
          <input
            type="checkbox"
            checked=${usesFluidRotation}
            onChange=${e => setFluidRotation(e.target.checked)}
          />
          <span>Fluid hand movement</span>
        </label>

        <label>
          <input
            type="checkbox"
            checked=${showSecondsHand}
            onChange=${e => setShowSecondsHand(e.target.checked)}
          />
          <span>Show seconds hand</span>
        </label>
      </fieldset>

      <fieldset>
        <legend>Manual time settings (pause)</legend>

        <div class="timegrid">
          <label>
            <span>Hour:</span>
            <span>${time.getHours()}</span>
            <input
              aria-label="hours"
              type="range"
              min="0"
              max="23"
              step="1"
              onInput=${set.bind(null, 'hours')}
              value=${time.getHours()}
            />
          </label>

          <label>
            <span>Minute:</span>
            <span>${time.getMinutes()}</span>
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
            <span>Second:</span>
            <span>${time.getSeconds()}</span>
            <input
              type="range"
              min="0"
              max="59"
              step="1"
              onInput=${set.bind(null, 'seconds')}
              value=${time.getSeconds()}
            />
          </label>
        </div>
      </fieldset>
    </form>
  `;
}

export default app;
