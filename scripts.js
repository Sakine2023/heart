let coinCount = 0;
let initialEnergy = 1000;
let currentEnergy = initialEnergy;

let lastClickTime = 0;
let clickIntervals = [];

document.getElementById('current-energy').textContent = currentEnergy;
document.getElementById('initial-energy').textContent = initialEnergy;

function incrementCoins() {
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - lastClickTime;

    if (currentEnergy > 0) {
        if (timeSinceLastClick < 100) {  // Check if the click interval is less than 333ms
            clickIntervals.push(timeSinceLastClick);
            if (clickIntervals.length > 2) {
                clickIntervals.shift();  // Keep the last two intervals
                const [firstInterval, secondInterval] = clickIntervals;
                if (firstInterval < 100 && secondInterval < 100) {
                    showOverlay();
                    return;
                }
            }
        } else {
            clickIntervals = [];  // Reset intervals if the click is not too fast
        }

        lastClickTime = currentTime;

        coinCount += 1;
        currentEnergy -= 1;
        document.getElementById('coin-count').textContent = coinCount;
        document.getElementById('current-energy').textContent = currentEnergy;
        updateEnergyBar();
    } else {
        alert("Energy depleted!");
    }
}

function updateEnergyBar() {
    const energyFill = document.getElementById('energy-fill');
    const percentage = (currentEnergy / initialEnergy) * 100;
    energyFill.style.width = percentage + '%';
}

function showOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
}

function closeGame() {
    window.close();
}

document.querySelector('.coin').addEventListener('click', incrementCoins);
