class Ampel {
    #rot = false;
    #gelb = false;
    #grün = false;

    get rot() {
        return this.#rot;
    }

    get gelb() {
        return this.#gelb;
    }

    get grün() {
        return this.#grün;
    }

    next() {
        if (this.#rot && !this.#gelb && !this.#grün) {
            this.#gelb = true; // Rot -> Rot + Gelb
        } else if (this.#rot && this.#gelb && !this.#grün) {
            this.#rot = false;
            this.#gelb = false;
            this.#grün = true; // Rot + Gelb -> Grün
        } else if (!this.#rot && !this.#gelb && this.#grün) {
            this.#gelb = true; // Grün -> Gelb
            this.#grün = false;
        } else if (!this.#rot && this.#gelb && !this.#grün) {
            this.#gelb = false;
            this.#rot = true; // Gelb -> Rot
        } else if (!this.#rot && !this.#gelb && !this.#grün) {
            this.#rot = true; // Initialzustand -> Rot
        }
    }
}

const ampeln = document.querySelectorAll('.ampel-container');
const ampelStates = Array.from(ampeln).map(() => new Ampel());

function updateLights() {
    ampeln.forEach((ampelContainer, index) => {
        const redLight = ampelContainer.querySelector('.red-light');
        const yellowLight = ampelContainer.querySelector('.yellow-light');
        const greenLight = ampelContainer.querySelector('.green-light');

        // Reset lights
        redLight.classList.remove('active-red');
        yellowLight.classList.remove('active-yellow');
        greenLight.classList.remove('active-green');

        // Update lights based on Ampel state
        const ampelState = ampelStates[index];
        if (ampelState.rot) {
            redLight.classList.add('active-red');
        }
        if (ampelState.gelb) {
            yellowLight.classList.add('active-yellow');
        }
        if (ampelState.grün) {
            greenLight.classList.add('active-green');
        }
    });
}

function cycle() {
    ampelStates.forEach((ampel) => ampel.next());
    updateLights();
}

// Initialisierung
updateLights();

// Starte den Wechsel alle 1,5 Sekunden
setInterval(cycle, 1500);
