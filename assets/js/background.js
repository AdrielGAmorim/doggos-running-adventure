import { getCustomProperty, incrementCustomProperty, setCustomProperty } from './updateCustomProperty.js';

const SPEED = .001;
const backgroundEl = document.querySelectorAll("[data-background");

export function setupBackground() {
    setCustomProperty(backgroundEl[0], '--left', 0);
    setCustomProperty(backgroundEl[1], '--left', 300);
}

export function updateBackground(delta, speedMultiplier) {
    backgroundEl.forEach(background => {
        incrementCustomProperty(background, '--left', delta * SPEED * speedMultiplier * -1);
        if(getCustomProperty(background, '--left') <= -300) {
            incrementCustomProperty(background, '--left', 600);
        }
    })
}