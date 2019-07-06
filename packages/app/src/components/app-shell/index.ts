import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property, observe } from "@polymer/decorators";
import "@polymer/paper-input/paper-input.js";
import { Color, isHexValue, shades, tints, mix } from "@color-contrast/core/dist";
import { wrap, proxy } from "comlink";

import { nextEvent } from "../../util/scheduling";

const WebWorker: Promise<
  import("comlink/src/comlink").Remote<
    import("../../worker").ColorContrastWorker
  >
> = (async () => {
  // The timing of events here is super buggy on iOS, so we need to tread very carefully.
  const worker = new Worker("../../worker", { type: "module" });
  // @ts-ignore - iOS Safari seems to wrongly GC the worker. Throwing it to the global to prevent
  // that happening.
  self.w = worker;

  const nextMessageEvent = nextEvent(worker, "message");

  // When we get a message back from our worker, we know we're ready.
  worker.postMessage("ready?");

  await nextMessageEvent;

  const remoteWorker = wrap(worker) as import("comlink/src/comlink").Remote<
    import("../../worker").ColorContrastWorker
  >;
  return remoteWorker;
})();

@customElement("cwg-app-shell")
export class CwgAppShell extends PolymerElement {
  
  @property({ type: String, notify: true })
  foregroundColor: string = "#FF0000";
  
  @property({ type: String, notify: true })
  backgroundColor: string = "#0000FF";
  
  @property({ type: String, notify: true })
  constrastRatio: string = "";
  
  @property({type: Array})
<<<<<<< HEAD
  public colors: {hex: string, hsl: string}[] = tints(new Color('#333'), 28)
  .map((color: Color) => mix(color, new Color('#D300F4'), 95))
  .map((color: Color) => {    
=======
  public colors: {hex: string, hsl: string}[] = tints(mix(new Color('#FF0'), new Color('#333'), 10), 5).map((color: Color) => {    
>>>>>>> 3082495fbe1558e811dc5ac27fe251033ed03926
    return {
      'hex': color.toHex(),
      'hsl': color.toHSL(),
    };
  });


  _contrastWorker?: import("comlink/src/comlink").Remote<
    import("../../worker").ColorContrastWorker
  >;

  constructor() {
    super();
    this._initWoker();
  }

  static get template() {
    return html`
      <div class="card">
        <h3>Add a foreground color</h3>
        <paper-input label="Color" value="{{foregroundColor}}"></paper-input>
      </div>
      <div class="card">
        <h3>Add a background color</h3>
        <paper-input label="Color" value="{{backgroundColor}}"></paper-input>
      </div>
      <div class="card">
        <p>contrast ratio: [[constrastRatio]]</p>
      </div>
      
      <section class="main-view">
      <dom-repeat items={{colors}}>
        <template>
        <div class="accessibility">
            <ul class="accessibility__items">
                <li class="accessibility__item">
                    <div class="accessibility-item" style$="background-color: [[item.hex]];">
                        <div class="accessibility-item__header">
                          <p>{{item.hsl}}</p>
                          <p>{{item.hex}}</p>
                        </div>
                        <div class="accessibility-item__table"></div>
                    </div>
                </li>
            </diulv>
          </div>
        </template>   
      </dom-repeat>
      </section>
    `;
  }

  @observe("foregroundColor")
  _onForegroundChnage(event: string) {
    this.foregroundColor = event;
    if (!this._validateColors()) {
    } else {
      this._updateColorContrast();
    }
  }

  @observe("backgroundColor")
  _onBackgroundChange(event: string) {
    this.backgroundColor = event;
    if (!this._validateColors()) {
    } else {
      this._updateColorContrast();
    }
  }

  _validateColors(): boolean {
    if (!isValidColor(this.backgroundColor)) {
      console.warn(
        `Invalid input: ${this.backgroundColor} is not a valid color.`
      );
      return false;
    }
    if (!isValidColor(this.foregroundColor)) {
      console.warn(
        `Invalid input: ${this.foregroundColor} is not a valid color.`
      );
      return false;
    }
    return true;
  }

  _initWoker() {
    WebWorker.then(async worker => {
      this._contrastWorker = worker;
      this._contrastWorker.init();
      this._updateColorContrast();
    });
  }

  async _updateColorContrast() {
    const r = await this._getContrastRatio(
      this.backgroundColor,
      this.foregroundColor
    )
      .then(value => value.toFixed(3))
      .then(decimal => {
        const dot = decimal.indexOf(".");
        if (dot > 0) {
          return decimal.substr(0, dot + 3);
        }
        return decimal;
      });

    this.constrastRatio = `${r}:1`;
  }

  async _getContrastRatio(
    backgroundStr: string,
    foregroundStr: string
  ): Promise<number> {
    if (!this._contrastWorker) {
      console.error("Contrast Worker: web worker not created");
      return -1;
    }
    const background = new Color(backgroundStr);
    const foreground = new Color(foregroundStr);
    return await this._contrastWorker.contrastRatio(
      background.toHex(),
      foreground.toHex()
    );
  }
}

function isValidColor(inputStr: string): boolean {
  if (!isHexValue(inputStr)) {
    return false;
  }
  return true;
}
