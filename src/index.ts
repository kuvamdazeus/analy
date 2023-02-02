import AnalyClient from "./AnalyClient";
import log from "./logger";

export function startClient() {
  try {
    window;
  } catch (e) {
    return;
  }

  const key = document.querySelector("[analy-key]")?.getAttribute("analy-key");
  if (!key) return log("error", "No API key provided!");

  const client = AnalyClient(key);

  const registeredElements = document.querySelectorAll("[analy-event]");

  registeredElements.forEach((element) => {
    const customEventName = element.getAttribute("analy-event"); // "user_login_start"
    const domEvent = element.getAttribute("analy-dom-event"); // "onclick" | "onmouseenter" | etc.

    if (!customEventName || !domEvent) return;

    element.addEventListener(domEvent, () => {
      if (!client) return;

      client.event(customEventName);
    });
  });

  let lastUrl = window.location.href;
  setInterval(() => {
    if (lastUrl !== window.location.href) {
      if (!client) return;
      client.event("page_load");
    }

    lastUrl = window.location.href;
  }, 10);
}

startClient();
