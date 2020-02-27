import { render } from '/web_modules/preact.js';
import App from './app.js';
import html from './html.js';

render(
  html`
    <${App} />
  `,
  document.getElementById('app')
);
