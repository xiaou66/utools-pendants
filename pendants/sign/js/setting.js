$(()=> {
    const {background = ""} = window.UtoolsUtils.read('xiaou_6/setting/customBackground');
    $("#imageUrl").val(background);
})
window.saveData = () => {
    let background = $("#imageUrl").val() || '';
    window.UtoolsUtils.save('xiaou_6/setting/customBackground', {
        background,
    });
}
window.onbeforeunload = () => {
    debugger;
    window.saveData();
    IpcRendererUtils.winClose();
}
