import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    "analy-dom-event": ElementEventMap;
    "analy-event-name": string;
  }
}
