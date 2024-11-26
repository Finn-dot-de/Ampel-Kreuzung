export class Linie {
    constructor(startX, startY, endX, endY, color = '#ffffff', lineWidth = 2, dashed = []) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
        this.lineWidth = lineWidth;
        this.dashed = dashed;
    }

    zeichne(ctx, canvas) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.setLineDash(this.dashed);
        ctx.moveTo(canvas.width * this.startX, canvas.height * this.startY);
        ctx.lineTo(canvas.width * this.endX, canvas.height * this.endY);
        ctx.stroke();
        ctx.setLineDash([]); // Zurücksetzen
    }
}
