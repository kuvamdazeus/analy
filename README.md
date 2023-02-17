# Analy Web Client (WIP)

## Install

```
npm i analy
```

## Setup

Setting up the script is a **3 step process**:

Firstly, `import "analy"` at the root of your application.

Second, create a `<div />` anywhere in the app as long as it is visible on every page:

```html
<div
  id="analy-config"
  analy-base-url="https://your-self-hosted-dashboard.com"
  analy-key="bdeb62c0be50aa233**********************aec4"
/>
```
> Note: Log into Dashboard & Create a project to get your API key

Here, `analy-base-url` is only to be used when self-hosting the dashboard, else avoid it altogether!

At this point, the script will be tracking page loads, sessions & all but to fire custom events, continue reading onto the next step.

Third, provide event names & event handlers to elements like so:

```html
<button analy-event="user_login_start" analy-dom-event="onclick">Login</button>
```

And... thats it!
You're all set up & ready to go ✨
