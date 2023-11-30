import { handleErrorWithSentry, Replay } from "@sentry/sveltekit";
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'https://6b61f466b00a214b832de2bbb161f9d9@o4506273637400576.ingest.sentry.io/4506273639366656',
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,  
  integrations: [new Replay()],
});

export const handleError = handleErrorWithSentry();
