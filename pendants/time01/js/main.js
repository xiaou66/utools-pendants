const sec = document.querySelector('.sec');
const min = document.querySelector('.min');
const hr = document.querySelector('.hr');
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();
setInterval(() => {
    const time = new Date();
    const secs = time.getSeconds() * 6;
    const mins = time.getMinutes() * 6;
    const hrs =time.getHours() * 30;
    sec.style.transform = `rotateZ(${secs}deg)`;
    min.style.transform = `rotateZ(${mins}deg)`;
    hr.style.transform = `rotateZ(${hrs + (mins / 12)}deg)`;
    document.querySelector('.date').textContent = [year.toString().padStart(2, 0), month.toString().padStart(2, 0), day.toString().padStart(2, 0)].join('.');
    document.querySelector('.time').textContent = `${time.getHours().toString().padStart(2, 0)}:${time.getMinutes().toString().padStart(2, 0)}:${time.getSeconds().toString().padStart(2, 0)}`;
})
document.onkeydown = (e) => {
    const code= e.code;
    console.log(code)
    switch (code) {

    }
}

