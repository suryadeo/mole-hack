    const startButton = document.querySelector('#start-button');
    const moleButton = document.querySelector(".hole");
    const moles = document.getElementsByClassName("mole");
    const winMessage = document.getElementById(`win-message`);
    let timeToAppear = getRandomTime(200, 400);
    let counter = 0;
    let timer = 0;
    let resetAll = false;

    startButton.addEventListener('click', function (event) {
        event.preventDefault();
        resetAll = true;
        if(resetAll) {
            winMessage.style.display = 'none';
            startButton.disabled = true;
            timerCounter();
            debounce(setInterval(startMole, timeToAppear), timeToAppear)
            document.addEventListener('click', onClickHole, false);
            document.addEventListener('click', onClickMole, false);
        }
    });


    function startMole () {
        timeToAppear = getRandomTime(200, 400);
        hideAllMole();
        randomMole();
    }


    function timerCounter() {
        setInterval(function() {
            const currentNode = document.querySelector('#timer-count');
            const newNode = document.createElement('span');
            newNode.id = 'timer-count';
            newNode.innerHTML = timer;
            currentNode.replaceWith(newNode);
            timer++;
        }, 1000);
        // timeToAppear = getRandomTime(200, 400);
    }

    function randomMole() {
        const moleId = getMoleId(4);
        displayMole(timeToAppear, moleId);
    }

    function getRandomTime(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getMoleId(totalMoles) {
        return Math.floor(Math.random() * (totalMoles - 1) + 1);
    }

    function hideAllMole() {
        for(let i = 0; i < moles.length; i++) {
            moles[i].style.display = 'none';
        }
    }

    function displayAllMole() {
        for(let i = 0; i < moles.length; i++) {
            moles[i].style.display = 'block';
        }
    }

    function displayMole(time, mole) {
        const selectedMole = document.getElementById(`mole-${mole}`);
        selectedMole.style.display = 'block';

    }

    function onClickHole(event) {
        if (!event.target.matches('.hole')) return;
        event.preventDefault();
        counter += 1;
        const currentNode = document.querySelector('#win-count');
        const newNode = document.createElement('span');
        newNode.id = 'win-count';
        newNode.innerHTML = counter;
        currentNode.replaceWith(newNode);
    }

    function onClickMole(event) {
        if (!event.target.matches('.mole')) return;
        event.preventDefault();
        alert(`Gotcha! time to catch ${timer} seconds and ${counter} clicks`);
        displayAllMole();
        reset();
    }

    function reset() {
        counter = 0;
        timer = 0;
        startButton.disabled = false;
        winMessage.style.display = 'block';
        window.clearInterval(timerCounter);
        resetAll = false;
    }

    function debounce(fn, duration) {
        console.log('this is debounce', fn, duration)
        let timer = null;
        return function (...args) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, duration)
        }
    }
    