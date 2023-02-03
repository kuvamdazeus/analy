import AnalyClient from "./AnalyClient";
import config from "./lib/config";
import log from "./logger";

function startClient() {
  try {
    if (!document || !window) throw new Error("");
  } catch (e) {
    return;
  }

  const configDivElem = document.getElementById("analy-config");

  const key = configDivElem?.getAttribute("analy-key");
  const baseUrl = configDivElem?.getAttribute("analy-base-url") || config.BASE_URL;

  if (!key) return log("error", "No API key provided!");

  const client = AnalyClient(key, baseUrl);

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
