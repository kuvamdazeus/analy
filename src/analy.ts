import SHA256 from "crypto-js/sha256";
import { v4 as uuid } from "uuid";
import config from "./lib/config";
import log from "./logger";
import { State, Methods, Session, Event } from "./types";

const state: State = {
  promises: [],
  apiKey: null,
  apiKeyVerified: false,
  deviceTypeKnown: false,
  lazyEvents: false,
  eventsLength: 0,
  accessToken: null,
  events: [],
  session: null,
};

const init = async () => {
  if (!state.apiKey) return log("error", "no API key provided!");

  document.addEventListener("pointermove", findUserDeviceType);
  // initiallize the Session {} here along with reloading the session

  const rawStrSession = sessionStorage.getItem("analy_session");
  const session: Session | null = rawStrSession ? JSON.parse(rawStrSession) : null;

  if (!session) {
    state.session = {
      id: Date.now().toString(),
      user_hash: SHA256(Date.now().toString()).toString(),
      project_key: state.apiKey,
      events: [],
    };
  } else state.session = session;

  // check apikey
  const apiKeyCheckPromise = fetch(`${config.BASE_URL}/apikey/check`, {
    headers: {
      ...config.authHeader(state.apiKey),
      session_id: state.session.id,
    },
  });
  state.promises.push(apiKeyCheckPromise);

  const res = await apiKeyCheckPromise;

  if (res.status !== 200) {
    state.apiKeyVerified = false;
    log("error", "invalid API key given");
  } else {
    state.apiKeyVerified = true;
    const { access_token } = await res.json();
    state.accessToken = access_token;
    log("log", "API key verified");
  }

  event("user_init");
};

const event = async (eventName: string) => {
  // why? this can be fired BEFORE init function, in case user triggers an event before the api key check is done
  await Promise.all(state.promises);

  if (!state.apiKey) return log("error", "can't register events, no API key provided!");
  if (!state.session) return log("error", "Unexpected error occured!");

  const newEvent: Event = {
    id: uuid(),
    session_id: state.session.id,
    window_url: window.location.href,
    name: eventName,
    created_at: new Date(),
  };

  state.events.push(newEvent);

  // make a type containing all predefined events & type for NON-RESERVED ACCEPTABLE event names
  if (!state.lazyEvents && eventName !== "user_init") offloadEvents();
};

const offloadEvents = async () => {
  await Promise.all(state.promises);

  if (!state.apiKey) return log("error", "can't offload events, no API key provided!");
  if (!state.apiKeyVerified) return log("error", "Invalid API key was given");
  if (!state.session) return log("error", "Unexpected error occured!");
  if (state.eventsLength === state.session.events.length) return;

  console.log("OFFLOAD EVENTS");
  // TODO: Make this an upsert query on backend
  // await axios.patch(`${config.BASE_URL}/session`, state.session, {
  //   headers: { ...config.authHeader(state.apiKey), access_token: state.accessToken },
  // });

  state.eventsLength = state.session.events.length;
};

const findUserDeviceType = (e: PointerEvent) => {
  if (state.deviceTypeKnown) return;

  console.log("FIND USER TYPE");
  state.deviceTypeKnown = true;
  state.lazyEvents = e.pointerType === "mouse";

  if (state.lazyEvents) {
    document.addEventListener("mouseleave", offloadEvents);
  }
};

export const AnalyClient = (apiKey: string) => {
  if (!!apiKey) state.apiKey = apiKey;

  const methods: Methods = {
    init,
    event,
    findUserDeviceType,
    offloadEvents,
  };

  return methods;
};
