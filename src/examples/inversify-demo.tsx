import { SandpackTypescript } from "../sandpack-ts";
import { SandpackLogLevel } from "@codesandbox/sandpack-client";

export function SandpackInversifyDemo() {
  return (
    <SandpackTypescript
      options={{
        visibleFiles: ["/index.ts"],
        bundlerURL: "http://localhost:1234/",
        logLevel: SandpackLogLevel.Debug,
      }}
      customSetup={{
        dependencies: { inversify: "6.0.1", "reflect-metadata": "0.1.13" },
      }}
      files={{
        "/index.ts": `import { injectable, inject, Container, decorate } from "inversify";
import "reflect-metadata";

const TYPES = {
  Katana: "Katana",
  Ninja: "Ninja",
  Shuriken: "Shuriken",
  Blowgun: "Blowgun",
};

class Blowgun {
  public blow() {
    return "poison!";
  }
}

class Katana {
  public hit() {
    return "cut!";
  }
}

class Shuriken {
  public throw() {
    return "hit!";
  }
}

class Ninja {
  public _katana: Katana;
  public _shuriken: Shuriken;
  public _blowgun!: Blowgun;

  public constructor(katana: Katana, shuriken: Shuriken) {
    this._katana = katana;
    this._shuriken = shuriken;
  }
  public fight() {
    return this._katana.hit();
  }
  public sneak() {
    return this._shuriken.throw();
  }
  public poisonDart() {
    return this._blowgun.blow();
  }

  public set blowgun(blowgun: Blowgun) {
    this._blowgun = blowgun;
  }
}

decorate(injectable(), Katana);
decorate(injectable(), Shuriken);
decorate(injectable(), Ninja);
decorate(injectable(), Blowgun);
decorate(inject(TYPES.Katana), Ninja, 0);
decorate(inject(TYPES.Shuriken), Ninja, 1);
decorate(inject(TYPES.Blowgun), Ninja.prototype, "blowgun");

const container = new Container();
container.bind<Ninja>(TYPES.Ninja).to(Ninja);
container.bind<Katana>(TYPES.Katana).to(Katana);
container.bind<Shuriken>(TYPES.Shuriken).to(Shuriken);
container.bind<Blowgun>(TYPES.Blowgun).to(Blowgun);

const ninja = container.get<Ninja>(TYPES.Ninja);

function addElement(content, container) {
  const newSpan = document.createElement("span");
  const newContent = document.createTextNode(content);
  newSpan.appendChild(newContent);
  container.appendChild(newSpan);
}

const main = document.getElementById('main');
addElement(ninja.fight(), main);
addElement(ninja.sneak(), main);
// console.log(ninja.fight()); // true
// console.log(ninja.sneak()); // true
`,
        "/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>inversify-demo</title>
    <style>
      html, body {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div id="main" style="width: 100vw;height:100vh;"></div>
  </body>
</html>`,
      }}
      template="vanilla-ts"
    />
  );
}
