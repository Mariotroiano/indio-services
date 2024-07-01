const timeouts = [];
const messageName = 'zero-timeout-message';

// Like setTimeout, but only takes a function argument.
// There's no time argument (always zero)
// https://dbaron.org/log/20100309-faster-timeouts

export function setZeroTimeout(fn: any) {
  timeouts.push(fn);
  window.postMessage(messageName, '*');
}

function handleMessage(event: MessageEvent) {
  if (event.source === window && event.data === messageName) {
    event.stopPropagation();
    if (timeouts.length > 0) {
      var fn = timeouts.shift();
      fn();
    }
  }
}

window.addEventListener('message', handleMessage, true);
