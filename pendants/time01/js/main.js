const sec = document.querySelector('.sec');
const min = document.querySelector('.min');
const hr = document.querySelector('.hr');
setInterval(() => {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    var l = ["日","一","二","三","四","五","六"];
    var d = time.getDay();
    const day = time.getDate();
    const secs = time.getSeconds() * 6;
    const mins = time.getMinutes() * 6;
    const hrs =time.getHours() * 30;
    sec.style.transform = `rotateZ(${secs}deg)`;
    min.style.transform = `rotateZ(${mins}deg)`;
    hr.style.transform = `rotateZ(${hrs + (mins / 12)}deg)`;
    document.querySelector('.date').textContent = [year.toString().padStart(2, 0), month.toString().padStart(2, 0), day.toString().padStart(2, 0)].join('.') + ' 星期' + l[d].toString();
    document.querySelector('.time').textContent = `${time.getHours().toString().padStart(2, 0)}:${time.getMinutes().toString().padStart(2, 0)}:${time.getSeconds().toString().padStart(2, 0)}`;
})
document.onkeydown = (e) => {
    const code= e.code;
    console.log(code)
    switch (code) {

    }
}

