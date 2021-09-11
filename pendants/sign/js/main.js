
const tl = gsap.timeline({repeat: -1, yoyo:true, repeatDelay: 0});
tl.to(".pusheen__svg", {duration: .3, transformOrigin:"50% 100%", scaleY: 1.01, scaleX: 0.99, ease: "power1"})
    .to("#whisker-r", {duration: .3, transformOrigin:"0% 50%", rotation: -10, ease: "power1"}, 0)
    .to("#whisker-l", {duration: .3, transformOrigin:"100% 50%", rotation: 10, ease: "power1"}, 0)
    .to("#paws", {duration: .3, transformOrigin:"50% 50%", y: -2, ease: "power1"}, 0);


const tl2 = gsap.timeline({repeat: -1, yoyo:true, repeatDelay: 0});
tl2.to("#tail", {duration: 1, transformOrigin:"100% 50%", rotation: 10, ease: "power1"}, 0);
setTimeout(() => {
    window.IpcRendererUtils.swatchFullScreen();
}, 50)
$("#close").on("click", () => {
    window.IpcRendererUtils.winClose();
})
document.onkeydown = (e) => {
    if (e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27) {
        window.IpcRendererUtils.winClose();
    }
}
