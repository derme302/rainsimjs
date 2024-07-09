const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

const person = {
    x: 400,
    y: 500,
    width: 50,
    height: 100,
    speed: 6,
    rainHit: 0,
    iteration: 0,
    maxIterations: 2000
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
            if (person.iteration < person.maxIterations)
                person.rainHit += 1;
            rainDrops.splice(index, 1);
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
    }

    if (person.iteration < person.maxIterations)
        person.iteration++;
}

function drawRainHitCount() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Rain Hit: ${person.rainHit}`, 10, 30);
    ctx.fillText(`Iteration: ${person.iteration}`, 240, 30);
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
