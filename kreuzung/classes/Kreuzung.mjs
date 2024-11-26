export class Kreuzung {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.straßen = [];
        this.linien = [];
        this.ampeln = [];
    }

    addStraße(straße) {
        this.straßen.push(straße);
    }

    addLinie(linie) {
        this.linien.push(linie);
    }

    addAmpel(ampelObjekt) {
        this.ampeln.push(ampelObjekt);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Straßen zeichnen
        this.straßen.forEach(straße => straße.zeichne(this.ctx, this.canvas));

        // Linien zeichnen
        this.linien.forEach(linie => linie.zeichne(this.ctx, this.canvas));

        // Ampeln zeichnen
        this.ampeln.forEach(ampelObjekt => ampelObjekt.zeichne(this.ctx, this.canvas));
    }
}
