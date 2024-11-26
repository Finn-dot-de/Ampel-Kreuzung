export class AmpelObjekt {
    constructor(x, y, degree = 0, ampel) {
        this.x = x;
        this.y = y;
        this.degree = degree; // Drehwinkel in Grad
        this.ampel = ampel; // Instanz der Ampel-Logik
    }

    zeichne(ctx, canvas) {
        const ampelBreite = Math.min(canvas.width, canvas.height) * 0.035;
        const ampelHöhe = ampelBreite * 3.2;
        const lichtRadius = ampelBreite * 0.34;
        const lichtAbstand = ampelHöhe / 4;

        const absX = canvas.width * this.x;
        const absY = canvas.height * this.y;

        ctx.save();
        ctx.translate(absX + ampelBreite / 2, absY + ampelHöhe / 2);
        ctx.rotate((this.degree * Math.PI) / 180);
        ctx.translate(-(ampelBreite / 2), -(ampelHöhe / 2));

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, ampelBreite, ampelHöhe);

        // Rotes Licht
        ctx.beginPath();
        ctx.arc(ampelBreite / 2, lichtAbstand * 0.8, lichtRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.ampel.rot ? 'red' : '#333';
        ctx.fill();

        // Gelbes Licht
        ctx.beginPath();
        ctx.arc(ampelBreite / 2, lichtAbstand * 2, lichtRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.ampel.gelb ? 'yellow' : '#333';
        ctx.fill();

        // Grünes Licht
        ctx.beginPath();
        ctx.arc(ampelBreite / 2, lichtAbstand * 3.2, lichtRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.ampel.grün ? 'green' : '#333';
        ctx.fill();

        ctx.restore();
    }
}
