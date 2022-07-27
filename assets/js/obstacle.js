import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const SPEED = .04;
const OBSTACLE_INTERVAL_MIN = 1000;
const OBSTACLE_INTERVAL_MAX = 3000;
// const OBSTACLE_FRAME_COUNT = 12;
// const FRAME_TIME = 100;
const gameEl = document.querySelector('[data-game]');

let nextObstacleTime;
let obstacleFrame;
let currentFrameTime;
export function setupObstacle() {
    nextObstacleTime = OBSTACLE_INTERVAL_MIN;
    obstacleFrame = 0;
    currentFrameTime = 0;
    document.querySelectorAll('[data-obstacle]').forEach(obstacle => {
        obstacle.remove();
    });
}

export function updateObstacle(delta, speedMultiplier) {
    // handleAnimation(delta);
    
    document.querySelectorAll('[data-obstacle]').forEach(obstacle => {
        incrementCustomProperty(obstacle, '--left', delta * speedMultiplier * SPEED * -1);
        if(getCustomProperty(obstacle, '--left') < -100) {
            obstacle.remove();
        }
        
    });

    if(nextObstacleTime <= 0) {
        createObstacle();
        nextObstacleTime = randomNumberBetween(
            OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedMultiplier;
    }
    nextObstacleTime -= delta;
}

// function handleAnimation(delta) {

//     if(currentFrameTime >= FRAME_TIME) {
//         obstacleFrame = (obstacleFrame + 1) % OBSTACLE_FRAME_COUNT;
//         document.querySelectorAll('[data-obstacle]').forEach(obstacle => {
//             obstacle.src = `./assets/images/obstacle-animation-${obstacleFrame}.png`
//         });
//         currentFrameTime -= FRAME_TIME;
//     }
//     currentFrameTime += delta;

    
// }

export function getObstacleRect() {
    return [...document.querySelectorAll('[data-obstacle]')].map(obstacle => {
        return  obstacle.getBoundingClientRect()
    });
}

function createObstacle() {
    const obstacle = document.createElement('img');
    obstacle.dataset.obstacle = true;
    obstacle.src = './assets/images/obstacle-rock-ground.png';
    obstacle.classList.add('obstacle');
    setCustomProperty(obstacle, '--left', 100);
    gameEl.append(obstacle);
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}