const men_circle = document.getElementById('men-circle');
const men_number = document.querySelector('.mem .card__number');
const cpu_circle = document.getElementById('cpu-circle');
const cpu_number = document.querySelector('.cpu .card__number');
function circlePercent(value, element) {
    const change = 580.2 - 580.2 * value / 100
    console.log(change);
    element.style.strokeDashoffset = change;
}
function setMenValue(value) {
    if(value > 100) {
    } else {
        men_number.innerHTML = `内存:${value}%`
        circlePercent(value, men_circle);
    }
}
function setCpuValue(value) {
    if(value > 100) {
    } else {
       cpu_number.innerHTML = `CPU:${value}%`
       circlePercent(value, cpu_circle);
    }
}
function collectInfo () {
    window.getMemoryInfo().then(res => {
        setMenValue(Math.round(res.usedMemPercentage));
    })
    window.getCpuInfo().then(res => {
        setCpuValue(Math.round(100 - res.free));
    })
}
collectInfo();
setInterval(collectInfo, 10 * 1000)
