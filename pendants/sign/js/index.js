document.onkeydown = (e) => {
    if (e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27) {
        window.IpcRendererUtils.winClose();
    }
}
