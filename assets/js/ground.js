import { getCustomProperty, incrementCustomProperty, setCustomProperty } from './updateCustomProperty.js';

const SPEED = .04;
const groundEl = document.querySelectorAll("[data-ground");

export function setupGround() {
    setCustomProperty(groundEl[0], '--left', 0);
    setCustomProperty(groundEl[1], '--left', 300);
}

export function updateGround(delta, speedMultiplier) {
    groundEl.forEach(ground => {
        incrementCustomProperty(ground, '--left', delta * SPEED * speedMultiplier * -1);
        if(getCustomProperty(ground, '--left') <= -300) {
            incrementCustomProperty(ground, '--left', 600);
        }
    })
}