import * as Sentry from "@sentry/browser";
import HappyIntegration from "./HappyIntegration";

const sentryConfig = {
  dsn: "foo",
  environment: 'dev',
  release: '0.0.0',
};
const user_id = 'user_id';
const user = user_id ? { id: user_id } : null;
const clientIntegrations = Sentry.defaultIntegrations.filter(
  integration => !["GlobalHandlers", "TryCatch"].includes(integration.name)
);

/**
 * initializes sentry's static error handler.
 * includes default integrations for catchall (`TryCatch` and `GlobalHandlers`).
 */
export const staticInit = () => {
  Sentry.init(sentryConfig);
  if (user) {
    Sentry.configureScope(scope => scope.setUser(user));
  }
};

export const staticCapture = Sentry.captureException.bind(Sentry)

/**
 * sentry client.
 * does not include catchall (`TryCatch` and `GlobalHandlers`).
 */
export class SentryLogger {
  hub;

  constructor(tags = []) {
    this.hub = new Sentry.Hub(
      new Sentry.BrowserClient({
        ...sentryConfig,
        integrations: [...clientIntegrations, new HappyIntegration()],
        beforeSend (event) {
          console.info("sending", event);
          return event;
        }
      })
    );
    this.hub.configureScope(scope => {
      if (user) {
        scope.setUser(user);
      }
      tags.forEach(tag => {
        const [key, value] = tag;
        scope.setTag(key, value);
      });
    });
  }

  // `level` may be `fatal`, `error`, `warning`, `info` or `debug`, defaults
  // to `error`
  captureException = (error, level = "error", tags = []) => {
    // integrations need a "main hub" which gets initialized by static `init`.
    // `run` binds current hub as main, even if static `init` was not used.
    this.hub.run(currentHub => {
      currentHub.withScope(scope => {
        scope.setLevel(level);
        tags.forEach(tag => {
          const [key, value] = tag;
          scope.setTag(key, value);
        });
        currentHub.captureException(error);
      });
    });
  };
}
