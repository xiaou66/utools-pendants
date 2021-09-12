const { jsx,render,Component } = nanoJSX;
class CustomBackground extends Component {
    render() {
        return jsx`
        <div class="content">
            <div class="browser-bar">
                <span class="close button" onClick=${() => window.IpcRendererUtils.winClose()}></span>
                <span class="min button"></span>
                <span class="max button"></span>
            </div>
            <textarea id="text" autofocus></textarea>
        </div>
        `
    }
}
const {background = ''} = window.UtoolsUtils.read('xiaou_6/setting/customBackground');
if (background) {
    $('#body').css('background-image', `url(${background})`);
}

render(jsx`<${CustomBackground} />`, document.getElementById('root'))
