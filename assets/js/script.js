    const startButton = document.querySelector('#start-button');
    const moleButton = document.querySelector(".hole");
    const moles = document.getElementsByClassName("mole");
    const winMessage = document.getElementById(`win-message`);
    let hideIntervalId;
    let startIntervalId;
    let timerIntervalId;
    let counter = 0;
    let timer = 0;
    let start = false;

    startButton.addEventListener('click', function (event) {
        event.preventDefault();
        start = true;
        if(start) {
            winMessage.style.display = 'none';
            startButton.disabled = true;
            setWinCount();
            setCounter();
            startMole();
            document.addEventListener('click', onClickHole, false);
            document.addEventListener('click', onClickMole, false);
        }
    });


    function startMole() {
        timerIntervalId = setInterval(timerCounter, 1000);
        startGame();
    }
    
    function startGame() {
        hideIntervalId = setInterval(hideAllMole, getRandomTime(200, 400));
        startIntervalId = setInterval(randomMole, 1800);
    }

    const debouncedShowMole = debounce(startGame, 400);

    const clickedHole = debounce(testClickedHole, 500);

    function testClickedHole() {
        console.log('this is clicked');
        // window.clearInterval(startIntervalId);
        // setTimeout(startGame, 1000);
    }


    function timerCounter() {
        timer++;
        setCounter();
    }

    function randomMole() {
        const moleId = getMoleId(4);
        displayMole(moleId);   
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

    function displayMole(mole) {
        const selectedMole = document.getElementById(`mole-${mole}`);
        selectedMole.style.display = 'block';
    }

    function onClickHole(event) {
        if (!event.target.matches('.hole')) return;
        event.preventDefault();
        counter += 1;
        setWinCount();
        // debouncedShowMole();
    }

    function setWinCount() {
        const currentNode = document.querySelector('#win-count');
        const newNode = document.createElement('span');
        newNode.id = 'win-count';
        newNode.innerHTML = counter;
        currentNode.replaceWith(newNode);
    }

    function setCounter() {
        const currentNode = document.querySelector('#timer-count');
        const newNode = document.createElement('span');
        newNode.id = 'timer-count';
        newNode.innerHTML = timer;
        currentNode.replaceWith(newNode);
    }

    function onClickMole(event) {
        if (!event.target.matches('.mole')) return;
        alert(`Gotcha! time to catch ${timer} seconds and ${counter} clicks`);
        reset();
    }

    function reset() {
        counter = 0;
        timer = 0;
        startButton.disabled = false;
        winMessage.style.display = 'block';
        window.clearInterval(timerIntervalId);
        window.clearInterval(startIntervalId);
        window.clearInterval(hideIntervalId);
        displayAllMole();
        start = false;
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
          var context = this,
          args = arguments;
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) {
              func.apply(context, args);
            }
          }, wait);
          if (callNow) func.apply(context, args);
        }
      }
    