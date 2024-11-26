export class Straße {
    constructor(x, y, width, height, color = '#4d4d4d') {
        this.x = x; // Relative Position X
        this.y = y; // Relative Position Y
        this.width = width; // Relative Breite
        this.height = height; // Relative Höhe
        this.color = color; // Straßenfarbe
    }

    zeichne(ctx, canvas) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            canvas.width * this.x,
            canvas.height * this.y,
            canvas.width * this.width,
            canvas.height * this.height
        );
    }
}
