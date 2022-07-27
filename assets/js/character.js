import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const characterEl = document.querySelector('[data-character]');
const JUMP_SPEED = .30;
const GRAVITY = .0010;
const CHARACTER_FRAME_COUNT = 8;
const FRAME_TIME = 100;

let isJumping;
let characterFrame;
let currentFrameTime;
let yVelocity;
export function setupCharacter() {
    isJumping = false;
    characterFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;
    setCustomProperty(characterEl, '--bottom', 16);
    document.removeEventListener("keydown", onJump);
    document.addEventListener("keydown", onJump);
    document.removeEventListener("touchstart", mobileJump);
    document.addEventListener("touchstart", mobileJump);
}

export function updateCharacter(delta, speedMultiplier) {
    handleRun(delta, speedMultiplier);
    handleJump(delta);
}

export function getCharacterRect() {
    return characterEl.getBoundingClientRect();
} 

function handleRun(delta, speedMultiplier) {
    if(isJumping) {
        characterEl.src = `./assets/images/character-jump.png`;
        return;
    }

    if(currentFrameTime >= FRAME_TIME) {
        characterFrame = (characterFrame + 1) % CHARACTER_FRAME_COUNT;
        characterEl.src = `./assets/images/character-run-${characterFrame}.png`;
        currentFrameTime -= FRAME_TIME;
    }
    currentFrameTime += delta * speedMultiplier;
}

function handleJump(delta) {
    if(!isJumping) return;

    incrementCustomProperty(characterEl, '--bottom', yVelocity * delta);

    if(getCustomProperty(characterEl, '--bottom') <= 16) {
        setCustomProperty(characterEl, '--bottom', 16);
        isJumping = false;
    }

    yVelocity -= GRAVITY * delta;
}

function onJump(e) {
    if(e.code !== "Space" || isJumping) return;

    yVelocity = JUMP_SPEED;
    isJumping = true;
}

function mobileJump ()  {
    if(isJumping) return;
    
    yVelocity = JUMP_SPEED;
    isJumping = true;
}

export function setCharacterGameOver() {
    characterEl.src = `./assets/images/character-game-over.png`;
}