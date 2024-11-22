class Ampel {
    #rot = false;
    #gelb = false;
    #grün = false;


    #geheim() {

    }

    get rot() {
        return this.#rot;
    }
    get gelb() {
        return this.#rot;
    }
    get grün() {
        return this.#rot;
    }

    next(){
        if(this.#rot === false && this.#gelb === false && this.#grün === false){
            this.#rot = true;
        } else if(this.#rot === true && this.#gelb === false && this.#grün === false){
            this.#rot = true;
            this.#gelb = true;
        } else if(this.#rot === true && this.#gelb === true && this.#grün === false){
            this.#rot = false;
            this.#gelb = false;
            this.#grün = true;
        } else if(this.#rot === false && this.#gelb === false && this.#grün === true){
            this.#gelb = true;
            this.#grün = false;
        } else if(this.#rot === false && this.#gelb === true && this.#grün === false){
            this.#gelb = false;
            this.#rot = true;
        }
    }

    #toCircle(lamp){
        return lamp === true ? '🔴': '⬤';
    }

    toString() {
        return `${this.#toCircle(this.#rot)} ${this.#gelb}`;
    }

}

const meineAmpel = new Ampel();

console.log(meineAmpel.toString());