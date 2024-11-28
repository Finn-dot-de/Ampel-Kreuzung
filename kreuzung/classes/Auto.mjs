export class Auto {
    #reifen = 4;
    #marke = "";
    #farbe = "unbekannt";
    #geschwindigkeit = 0;
    #positionX = 0;
    #positionY = 0;
    #breite = 250;
    #höhe = 200;
    #richtung = { dx: 1, dy: 0 }; // Blickrichtung (Normalisierter Vektor)
    #bild = null; // Textur des Autos
    #route = []; // Liste von Wegpunkten (Koordinaten)
    #aktuellerWegpunktIndex = 0;
  
    constructor(
      reifen = 4,
      marke = "unbekannt",
      farbe = "unbekannt",
      bildUrl = ""
    ) {
      this.#reifen = reifen;
      this.#marke = marke;
      this.#farbe = farbe;
  
      // Optional: Bild (Textur) laden
      if (bildUrl) {
        this.#bild = new Image();
        this.#bild.src = bildUrl;
      }
    }
  
    setPosition(x, y) {
      this.#positionX = x;
      this.#positionY = y;
    }
  
    setRoute(route) {
      this.#route = route;
      this.#aktuellerWegpunktIndex = 0; // Starte bei erstem Wegpunkt
    }
  
    fahren(geschwindigkeit) {
      this.#geschwindigkeit = geschwindigkeit;
    }
  
    stop() {
      this.#geschwindigkeit = 0; // Geschwindigkeit auf 0 setzen
    }
  
    setBlickrichtung(dx, dy) {
      const length = Math.sqrt(dx * dx + dy * dy);
      this.#richtung = { dx: dx / length, dy: dy / length }; // Normalisieren
    }
  
    getBlickrichtung() {
      return this.#richtung;
    }
  
    aktualisieren(canvasBreite, canvasHöhe, kreuzung) {
      if (this.#route.length === 0) return; // Keine Route gesetzt
  
      const ziel = this.#route[this.#aktuellerWegpunktIndex];
      const dx = ziel.x - this.#positionX;
      const dy = ziel.y - this.#positionY;
      const dist = Math.sqrt(dx * dx + dy * dy);
  
      // Prüfen, ob das Ziel erreicht ist
      if (dist < this.#geschwindigkeit) {
        this.#aktuellerWegpunktIndex++;
        if (this.#aktuellerWegpunktIndex >= this.#route.length) {
          this.#aktuellerWegpunktIndex = 0; // Zurück zum Start
        }
      } else {
        // Blickrichtung aktualisieren und bewegen
        this.setBlickrichtung(dx, dy);
        this.#positionX += this.#richtung.dx * this.#geschwindigkeit;
        this.#positionY += this.#richtung.dy * this.#geschwindigkeit;
      }
  
      // Ampelerkennung
      const sichtbareAmpel = this.erkenneAmpeln(
        kreuzung.ampeln,
        canvasBreite,
        canvasHöhe
      );
      if (sichtbareAmpel) {
        this.reagiereAufAmpel(sichtbareAmpel);
      }
    }
  
    erkenneAmpeln(ampeln, canvasBreite, canvasHöhe) {
      return ampeln.find((ampelObjekt) => {
        const distX = ampelObjekt.x * canvasBreite - this.#positionX;
        const distY = ampelObjekt.y * canvasHöhe - this.#positionY;
  
        // Prüfen, ob die Ampel in Blickrichtung liegt
        const dotProduct = distX * this.#richtung.dx + distY * this.#richtung.dy;
  
        if (dotProduct > 0) {
          // Nur prüfen, wenn Ampel vor dem Auto liegt
          const dist = Math.sqrt(distX ** 2 + distY ** 2);
          return dist < 150; // Ampel innerhalb von 150 Pixeln
        }
        return false;
      });
    }
  
    reagiereAufAmpel(ampel) {
      if (ampel.ampel.rot) {
        this.stop(); // Anhalten bei roter Ampel
      } else if (ampel.ampel.gelb) {
        this.fahren(1); // Langsam vorbereiten zu fahren
      } else if (ampel.ampel.grün) {
        this.fahren(2); // Geschwindigkeit setzen
      }
    }
  
    draw(ctx) {
      if (this.#bild && this.#bild.complete) {
        // Zeichne das Auto als Bild (Textur)
        ctx.drawImage(
          this.#bild,
          this.#positionX,
          this.#positionY,
          this.#breite,
          this.#höhe
        );
      } else {
        // Fallback: Zeichne ein Rechteck
        ctx.fillStyle = this.#farbe;
        ctx.fillRect(this.#positionX, this.#positionY, this.#breite, this.#höhe);
      }
    }
  
    setSize(breite, höhe) {
      this.#breite = breite;
      this.#höhe = höhe;
    }
  
    getDetails() {
      return {
        reifen: this.#reifen,
        marke: this.#marke,
        farbe: this.#farbe,
        geschwindigkeit: this.#geschwindigkeit,
        position: { x: this.#positionX, y: this.#positionY },
        richtung: this.#richtung,
      };
    }
  }
  