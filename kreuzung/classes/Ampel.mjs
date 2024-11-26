export class Ampel {
    rot
    gelb
    grün
    constructor(rot = true, gelb = false, grün = false) {
        // Validierung: Nur ein Zustand darf aktiv sein
        const isValid = [rot, gelb, grün].filter(Boolean).length === 1;

        if (!isValid) {
            throw new Error('Ampel kann nur in einem Zustand initialisiert werden: rot, gelb oder grün.');
        }

        // Initialzustände setzen
        this.rot = rot;
        this.gelb = gelb;
        this.grün = grün;
    }

    // Zustand wechseln
    next() {
        if(this.rot === false && this.gelb === false && this.grün === false){
            this.rot = true;
        } else if(this.rot === true && this.gelb === false && this.grün === false){
            this.rot = true;
            this.gelb = true;
        } else if(this.rot === true && this.gelb === true && this.grün === false){
            this.rot = false;
            this.gelb = false;
            this.grün = true;
        } else if(this.rot === false && this.gelb === false && this.grün === true){
            this.gelb = true;
            this.grün = false;
        } else if(this.rot === false && this.gelb === true && this.grün === false){
            this.gelb = false;
            this.rot = true;
        }
    }
}
