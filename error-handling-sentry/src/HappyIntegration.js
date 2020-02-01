import * as Sentry from "@sentry/browser";

// Very happy integration that'll prepend and append very happy stick figure to the message
class HappyIntegration {
  constructor() {
    this.name = "HappyIntegration";
  }

  setupOnce(addGlobalEventProcessor, getCurrentHub) {
    Sentry.addGlobalEventProcessor(event => {
      const self = Sentry.getCurrentHub().getIntegration(HappyIntegration);
      // Run the integration ONLY when it was installed on the current Hub
      if (self) {
        const error = event.exception.values[0];
        error.value = `\\o/ ${error.value} \\o/`;
      }
      return event;
    });
  }
}

HappyIntegration.id = "HappyIntegration";

export default HappyIntegration
