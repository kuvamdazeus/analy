import SHA256 from "crypto-js/sha256";
import { v4 as uuid } from "uuid";
import config from "./lib/config";
import log from "./logger";
import { Event, Session } from "./types";

interface State {
  projectKey: string;
  session: Session | null;
}

const state: State = {
  projectKey: "",
  session: null,
};

const init = () => {
  const rawStrSession = sessionStorage.getItem("analy_session");
  const userHash = localStorage.getItem("analy_user_hash");
  const session: Session | null = rawStrSession ? JSON.parse(rawStrSession) : null;

  if (!userHash && !session) {
    state.session = {
      id: uuid(),
      user_hash: SHA256(Date.now().toString() + Math.random().toString()).toString(),
      project_key: state.projectKey,
    };

    localStorage.setItem("analy_user_hash", state.session.user_hash);
    sessionStorage.setItem("analy_session", JSON.stringify(state.session));

    log("log", "User init");
    event("user_init");
  }

  if (userHash && !session) {
    state.session = {
      id: uuid(),
      user_hash: userHash,
      project_key: state.projectKey,
    };

    sessionStorage.setItem("analy_session", JSON.stringify(state.session));

    event("page_load");
  }

  if (userHash && session) {
    state.session = session;
    event("page_load");
  }
};

const event = (eventName: string) => {
  if (!state.session) return log("error", "No session found!");

  const event: Event = {
    id: uuid(),
    session_id: state.session.id,
    name: eventName,
    window_url: window.location.href,
    created_at: new Date(),
  };

  fetch(`${config.BASE_URL}/tics/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session: state.session, event }),
  });
};

const AnalyClient = (projectKey: string) => {
  if (!projectKey) return log("error", "No project key provided!");

  state.projectKey = projectKey;
  init();

  return {
    event,
  };
};

export default AnalyClient;
