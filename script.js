function updateTime(time) {
    const clock = document.getElementById("digital");
    clock.innerText = time;
}

function addZero(num) {
    return num < 10 ? `0${num}` : num;
}

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const currentTime = `${addZero(hours)} : ${addZero(minutes)} : ${addZero(seconds)}`;

    updateTime(currentTime);
}

function main() {
    getTime();
    setInterval(getTime, 1000);
}

main();