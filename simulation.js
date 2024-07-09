const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

const person = {
    x: 400,
    y: 500,
    width: 50,
    height: 100,
    speed: 3,
    rainHit: 0,
    iteration: 0,
    currentCrossing: 0,
    minCrossings: 2, // Need to allow time for the rain to fall!
    maxCrossings: 12
};

const rainDrops = [];
const rainDirection = { x: 0, y: 4 };

function createRainDrop() {
    return {
        x: Math.random() * canvas.width,
        y: 0,
        width: 2,
        height: 10
    };
}

function updateRainDrops() {
    rainDrops.forEach(drop => {
        drop.x += rainDirection.x;
        drop.y += rainDirection.y;
    });

    if (Math.random() < 0.1) {
        rainDrops.push(createRainDrop());
    }

    rainDrops.forEach((drop, index) => {
        if (drop.y > canvas.height) {
            rainDrops.splice(index, 1);
        }
        if (drop.x > person.x && drop.x < person.x + person.width &&
            drop.y + drop.height > person.y && drop.y < person.y + person.height) {
            if (person.currentCrossing > person.minCrossings && person.currentCrossing < person.maxCrossings) {
                person.rainHit += 1;
                rainDrops.splice(index, 1);
            }
        }
    });
}

function drawPerson() {
    ctx.fillStyle = 'red';
    ctx.fillRect(person.x, person.y, person.width, person.height);
}

function drawRainDrops() {
    ctx.fillStyle = 'blue';
    rainDrops.forEach(drop => {
        ctx.fillRect(drop.x, drop.y, drop.width, drop.height);
    });
}

function updatePerson() {
    person.x += person.speed;
    if (person.x > canvas.width) {
        person.x = -person.width;

        if (person.currentCrossing < person.maxCrossings)
            person.currentCrossing++;
    }

    person.iteration++;
}

function drawRainHitCount() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Rain Drops Hit: ${person.rainHit}`, 10, 30);
    ctx.fillText(`Number of crossings: ${person.currentCrossing}`, 240, 30);
    ctx.fillText(`Person Velocity: ${person.speed}`, 10, 60);
    ctx.fillText(`Iteration: ${person.iteration}`, 240, 60);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateRainDrops();
    updatePerson();
    drawPerson();
    drawRainDrops();
    drawRainHitCount();
    requestAnimationFrame(gameLoop);
}

gameLoop();
