import html from './html.js';

const fatWidth = 6.28;
const slimWidth = 4;

const hourFingerLength = 27;
const minuteFingerLength = 36;
const secondFingerLength = 38;

function clock({
  showSeconds = false,
  fluid = true,
  dateTime = new Date(),
  ...htmlAttributes
}) {
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  const milliseconds = dateTime.getMilliseconds();

  const secondRotation =
    360 * (seconds / 60) + (fluid ? 360 * (milliseconds / 1000 / 60) : 0);
  const minuteRotation =
    360 * (minutes / 60) + (fluid ? secondRotation / 60 : 0);
  const hourRotation = 360 * (hours / 12) + (fluid ? minuteRotation / 12 : 0);

  return html`
    <svg
      ...${htmlAttributes}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      stroke="currentColor"
      stroke-linecap="round"
    >
      <style>
        g {
          // transition: transform 1s;
        }
      </style>

      <circle
        cx="50"
        cy="50"
        r=${50 - fatWidth / 2}
        fill="none"
        stroke-width=${fatWidth}
      />

      <path
        d="M50 60 L50 ${50 - hourFingerLength}"
        stroke-width=${fatWidth}
        transform="rotate(${hourRotation},50,50)"
      />

      <path
        d="M50 60 L50 ${50 - minuteFingerLength}"
        stroke-width=${slimWidth}
        transform="rotate(${minuteRotation},50,50)"
      />

      ${showSeconds &&
        html`
          <g
            stroke-width=${1}
            stroke="red"
            transform="rotate(${secondRotation},50,50)"
          >
            <circle cx="50" cy="50" r="1" fill="red" />
            <circle cx="50" cy=${50 - secondFingerLength} r="3" fill="red" />
            <path d="M50 64 L50 ${50 - secondFingerLength}" />
          </g>
        `}
    </svg>
  `;
}

export default clock;
