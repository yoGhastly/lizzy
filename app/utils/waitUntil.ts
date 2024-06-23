export function waitUntil(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
