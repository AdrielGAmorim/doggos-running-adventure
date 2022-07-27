import { setupGround, updateGround } from './ground.js';
import { updateCharacter, setupCharacter, getCharacterRect, setCharacterGameOver } from './character.js';
import { updateObstacle, setupObstacle, getObstacleRect } from './obstacle.js';
import { setupBackground, updateBackground } from './background.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_MULTIPLIER_INC = .00001;

const gameEl = document.querySelector('[data-game]');
const scoreEl = document.querySelector('[data-score]');
const startScreenEl = document.querySelector('[data-start-screen]');

resizeGameToScreen();
window.addEventListener('resize', resizeGameToScreen);
document.addEventListener('keydown', handleStart, { once: true });
document.addEventListener('touchstart', handleStart, { once: true });

let lastTime;
let speedMultiplier;
let score;
function update(time) {
    if(lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;
    
    updateBackground(delta, speedMultiplier);
    updateGround(delta, speedMultiplier);
    updateCharacter(delta, speedMultiplier);
    updateObstacle(delta, speedMultiplier);
    updateSpeedMultiplier(delta);
    updateScore(delta);
    if(checkGameOver()) return handleGameOver();
    
    lastTime = time;
    window.requestAnimationFrame(update);
}

export function handleStart(e) {
    lastTime = null;
    speedMultiplier = 1;
    score = 0;

    setupBackground();
    setupGround();
    setupCharacter();
    setupObstacle();

    scoreEl.style.fontSize = '5vmin';
    scoreEl.style.color = '#1C1616';
    startScreenEl.classList.add('hidden');
    window.requestAnimationFrame(update);
}

function checkGameOver() {
    const characterRect = getCharacterRect();
    return getObstacleRect().some(obstacleRect => isCollision(obstacleRect, characterRect));
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
        );
    }
    
    console.log(isCollision())
    
    function handleGameOver() {
        setCharacterGameOver();
        setTimeout(() => {
            document.addEventListener('keydown', handleStart, { once: true });
            document.addEventListener('touchstart', handleStart, { once: true });
            
            /* Score on Game Over */ 
            startScreenEl.innerHTML = `
                Game Over</br>
                You made ${ Math.floor(score) } points</br></br>
                Press any key to try again
            `;
            startScreenEl.classList.remove('hidden');
        }, 100);
}

function updateSpeedMultiplier(delta) {
    speedMultiplier += delta * SPEED_MULTIPLIER_INC;
}

function updateScore(delta) {
    score += delta * .01;
    scoreEl.textContent = Math.floor(score);

    /** Score styling during gameplay */
    if(score >= 300) {
        scoreEl.style.fontSize = '5.3vmin';
        scoreEl.style.color = '#35d9d7';
    }
    if(score >= 600) {
        scoreEl.style.fontSize = '5.6vmin';
        scoreEl.style.color = '#35d966';
    }
    if(score >= 1000) {
        scoreEl.style.fontSize = '6vmin';
        scoreEl.style.color = '#72d935';
    }
    if(score >= 2000) {
        scoreEl.style.fontSize = '6.5vmin';
        scoreEl.style.color = '#d0d935';
    }
    if(score >= 3000) {
        scoreEl.style.fontSize = '7vmin';
        scoreEl.style.color = '#d98d35';
    }
    if(score >= 4000) {
        scoreEl.style.fontSize = '8vmin';
        scoreEl.style.color = '#ff0000';
    }
}

function resizeGameToScreen() {
    let orientationValue;
    if(window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        orientationValue = window.innerWidth / WORLD_WIDTH;
    } else {
        orientationValue = window.innerHeight / WORLD_HEIGHT;
    }

    gameEl.style.width = `${WORLD_WIDTH * orientationValue}px`;
    gameEl.style.height = `${WORLD_HEIGHT * orientationValue}px`;
}