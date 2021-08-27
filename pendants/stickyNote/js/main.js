const winClose = document.getElementById('close');
const winAppend = document.getElementById('append');
const textarea = document.getElementById('textarea');
const clear = document.getElementById('clear');
const sticky = document.getElementById('sticky');
const colorPicker = document.getElementById('colorPicker');
const colors = ['#f9f8c4', '#f18', '#F55C47', '#FFC288',
                '#B5EAEA', '#EDF6E5', '#FFBCBC', '#F38BA0',
                '#A2DBFA', '#39A2DB', '#3C8DAD', '#DBE6FD',
                '#98DDCA', '#D5ECC2', '#FFD3B4', '#FFAAA7',
                '#FFCB91', '#FFEFA1', '#94EBCD', '#6DDCCF'
]
let currentBackgroundColor = '#f9f8c4';
window.onload = () => {
    colors.map(color => {
        const li = document.createElement('li');
        li.style = `background:${color};`;
        li.onclick = () => selectColor(color);
        colorPicker.children[0].appendChild(li);
    })
}
function selectColor(color) {
    const {R, B, G} = colorRgb(color);
    currentBackgroundColor = color;
    document.getElementById('tool').style= ` background: rgba(${R},${B},${G}, 1);`
    document.getElementsByTagName('body')[0].style= ` background: rgba(${R},${B},${G}, 0.8);`
    document.getElementById('colorPicker').style = ` background: rgba(${R},${B},${G}, 1);`;
}
winClose.onclick = () => {
    window.winClose();
}
winAppend.onclick = () => {
    IpcRendererUtils.winClone();
}
textarea.onblur = () => {
    window.saveData(window.getData());

}
window.initData = ({note = '', backgroundColor = ''} = {}) => {
    if (note) {
        textarea.value = note
    }
    if (backgroundColor) {
        selectColor(backgroundColor);
    }
    window.getData();
}

clear.onclick = () => {
    window.winClose(false);
}
sticky.onclick = () => {
    window.IpcRendererUtils.swatchAlwaysOnTop();
}
window.getData = () => {
    const data = {note: textarea.value, backgroundColor: currentBackgroundColor}
    return data;
}
function colorRgb(color){
    let sColor = color.toLowerCase();
    //十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        let sColorChange = [];
        for (let i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));
        }
        return {R: sColorChange[0], B: sColorChange[1], G: sColorChange[2]};
    }
    return sColor;
};
