import { Kreuzung } from "./classes/kreuzung.mjs";
import { Straße } from "./classes/Straße.mjs";
import { Linie } from "./classes/Linie.mjs";
import { AmpelObjekt } from "./classes/AmpelObjekt.mjs";
import { Ampel } from "./classes/Ampel.mjs";
import { Auto } from "./classes/Auto.mjs";

const canvas = document.getElementById("kreuzung");
const ctx = canvas.getContext("2d");

// Auto erstellen
const meinAuto = new Auto(4, "BMW", "", "./assets/auto.png");

const route = [
    { x: 0 * canvas.width, y: 4.5 * canvas.height }, // 1 links
    { x: 4.5 * canvas.width, y: 4.5 * canvas.height }, // 2 links
    { x: 4.5 * canvas.width, y: 0 * canvas.height }, // 3  nach oben
    { x: 3 * canvas.width, y: 0 * canvas.height }, // 4 nach oben
    { x: 3 * canvas.width, y: 7 * canvas.height }, // 5
    { x: 5 * canvas.width, y: 7 * canvas.height }, // 6
    { x: 5 * canvas.width, y: 4.5 * canvas.height }, // 7
    { x: 7 * canvas.width, y: 4.5 * canvas.height }, // 8
    { x: 7 * canvas.width, y: 2.5 * canvas.height }, // 9
    { x: 0 * canvas.width, y: 2.5 * canvas.height }, // 10
  ];
  meinAuto.setRoute(route);
  meinAuto.setPosition(route[0].x, route[0].y); // Startposition
  meinAuto.fahren(1); // Geschwindigkeit setzen
  

// Referenzgröße für das Layout
const REFERENCE_WIDTH = 1279;
const REFERENCE_HEIGHT = 1277;

function getScaleFactor() {
  const scale = Math.min(
    canvas.width / REFERENCE_WIDTH,
    canvas.height / REFERENCE_HEIGHT
  );
  return scale;
}

// Kreuzung initialisieren
const kreuzung = new Kreuzung(canvas, ctx);

function setupAmpeln() {
  kreuzung.ampeln = [];
  const scale = Math.min(canvas.width / 1279, canvas.height / 1277);

  // Ampeln an den Kreuzungsstellen platzieren
  kreuzung.addAmpel(
    new AmpelObjekt(0.26 * scale, 0.183 * scale, 180, new Ampel(true))
  ); // Oben
  kreuzung.addAmpel(
    new AmpelObjekt(0.7 * scale, 0.708 * scale, 0, new Ampel(true))
  ); // Unten
  kreuzung.addAmpel(
    new AmpelObjekt(
      0.739 * scale,
      0.227 * scale,
      -90,
      new Ampel(false, false, true)
    )
  ); // Rechts
  kreuzung.addAmpel(
    new AmpelObjekt(
      0.224 * scale,
      0.66 * scale,
      90,
      new Ampel(false, false, true)
    )
  ); // Links
}

function setupKreuzung() {
  const scale = getScaleFactor();

  // Zurücksetzen der Kreuzung
  kreuzung.straßen = [];
  kreuzung.linien = [];
  kreuzung.ampeln = [];

  // Straßen hinzufügen
  kreuzung.addStraße(new Straße(0.3 * scale, 0, 0.4 * scale, 1 * scale)); // Vertikale Straße
  kreuzung.addStraße(new Straße(0, 0.3 * scale, 1 * scale, 0.4 * scale)); // Horizontale Straße

  // Fahrbahnbegrezungslinien
  kreuzung.addLinie(
    new Linie(
      0.3 * scale,
      0,
      0.3 * scale,
      0.3 * scale,
      "#ffffff",
      8 * scale,
      []
    )
  ); // Oben Links

  kreuzung.addLinie(
    new Linie(
      0.697 * scale,
      0,
      0.697 * scale,
      0.302 * scale,
      "#ffffff",
      8 * scale,
      []
    )
  ); // Oben Rechts

  kreuzung.addLinie(
    new Linie(
      1 * scale,
      0.303 * scale,
      0.7 * scale,
      0.303 * scale,
      "#ffffff",
      8 * scale,
      []
    )
  ); // Rechts Oben

  kreuzung.addLinie(
    new Linie(
      1 * scale,
      0.705 * scale,
      0.7 * scale,
      0.705 * scale,
      "#ffffff",
      8 * scale,
      []
    )
  ); // Rechts Unten

  kreuzung.addLinie(
    new Linie(
      0,
      0.697 * scale,
      0.3 * scale,
      0.697 * scale,
      "#ffffff",
      8 * scale,
      []
    )
  ); // Links Unten

  kreuzung.addLinie(
    new Linie(
      0,
      0.297 * scale,
      0.3 * scale,
      0.297 * scale,
      "#ffffff",
      8 * scale,
      []
    )
  ); // Links Oben

  kreuzung.addLinie(
    new Linie(
      0.298 * scale,
      0.698 * scale,
      0.298 * scale,
      1 * scale,
      "#ffffff",
      8 * scale,
      []
    )
  ); // Unten Rechts

  kreuzung.addLinie(
    new Linie(
      0.697 * scale,
      0.709 * scale,
      0.697 * scale,
      1 * scale,
      "#ffffff",
      8 * scale,
      []
    )
  ); // Unten Links

  // Mittellinien
  kreuzung.addLinie(
    new Linie(
      0.5 * scale,
      0,
      0.5 * scale,
      0.3 * scale,
      "#ffffff",
      10 * scale,
      []
    )
  ); // Vertikal Oben

  kreuzung.addLinie(
    new Linie(
      0.5 * scale,
      0.7024 * scale,
      0.5 * scale,
      1 * scale,
      "#ffffff",
      10 * scale,
      []
    )
  ); // Vertikal Unten

  kreuzung.addLinie(
    new Linie(
      0,
      0.5 * scale,
      0.301 * scale,
      0.5 * scale,
      "#ffffff",
      10 * scale,
      []
    )
  ); // Horizontal Links

  kreuzung.addLinie(
    new Linie(
      0.695 * scale,
      0.5 * scale,
      1 * scale,
      0.5 * scale,
      "#ffffff",
      10 * scale,
      []
    )
  ); // Horizontal Rechts

  // Halte-Linien
  kreuzung.addLinie(
    new Linie(
      0.293 * scale,
      0.6979 * scale,
      0.293 * scale,
      0.4979 * scale,
      "#ffffff",
      20 * scale,
      []
    )
  ); // Links

  kreuzung.addLinie(
    new Linie(
      0.7024 * scale,
      0.301 * scale,
      0.7024 * scale,
      0.5 * scale,
      "#ffffff",
      20 * scale,
      []
    )
  ); // Rechts

  kreuzung.addLinie(
    new Linie(
      0.3 * scale,
      0.292 * scale,
      0.5 * scale,
      0.292 * scale,
      "#ffffff",
      20 * scale,
      []
    )
  ); // Oben

  kreuzung.addLinie(
    new Linie(
      0.5 * scale,
      0.71 * scale,
      0.7 * scale,
      0.71 * scale,
      "#ffffff",
      20 * scale,
      []
    )
  ); // Unten
}

// Responsive Funktion
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  setupKreuzung(); // Kreuzung neu initialisieren
  setupAmpeln();
  animate();
  kreuzung.draw(); // Neu zeichnen
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    kreuzung.draw(); // Kreuzung zeichnen
    meinAuto.aktualisieren(canvas.width, canvas.height, kreuzung); // Auto aktualisieren
    meinAuto.draw(ctx); // Auto zeichnen

    requestAnimationFrame(animate);
}

// Event Listener für Fenstergröße
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Ampelsteuerung
setInterval(() => {
  kreuzung.ampeln.forEach((ampelObjekt) => ampelObjekt.ampel.next());
}, 4000); // Wechsel alle 10 Sekunden
