export function logMe(message?: any) {
  const stack = (new Error).stack;
  const line = stack.split('\n')[2];
  const name = line.match(/ at (.*) /)[1];
  const params = [name];
  if (message) {
    params.push(message);
  }
  console.log(...params);
}
