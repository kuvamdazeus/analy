export default function log(type: "error" | "warning" | "log", ...messages: any[]) {
  switch (type) {
    case "error":
      console.error("Analy Client Error:", ...messages);
      break;

    case "warning":
      console.error("Analy Client Warning:", ...messages);
      break;

    default:
      console.log("Analy Client:", ...messages);
      break;
  }
}
