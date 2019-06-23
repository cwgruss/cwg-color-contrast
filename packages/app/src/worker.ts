import { expose, proxy } from "comlink";
import { ColorContrastWorker } from "./util";
export {ColorContrastWorker} from  './util/color-contrast';
declare var self: DedicatedWorkerGlobalScope;

expose(proxy(new ColorContrastWorker()), self);

addEventListener("message", event => {
  if (event.data === "ready?") {
    console.log('BOOM! We ready')
    self.postMessage("READY");
  }
});

self.postMessage("READY");
