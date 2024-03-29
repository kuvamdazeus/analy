# Analy Web Client (WIP)

## What is it?
Analy is a fully open-source & self-hostable Analytics client with backend written in Next.js.

This repo contains the code for the tracker script for tracking website usage.

The script uses self-generated ids for session & user identification and saving the ids in session & local storage, not using cookies to maximize user privacy.

Code for live dashboard is hosted at https://github.com/kuvamdazeus/analy-dashboard

[Here](https://analy-dashboard.vercel.app/dashboard/53dbd800-cda6-4b1d-9ee8-ccf1802bbe0e) is a working demo of the live dashboard.

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
