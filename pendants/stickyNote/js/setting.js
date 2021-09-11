function limitNumber() {
    this.value=this.value.replace(/\D/g,'');
    if (this.value.length > 2) {
        this.value = this.value.substring(2, 0);
    }
}
document.querySelector('#font-size').onkeyup = limitNumber;
english.params.filter = (data,value) => {
    if (!value) {
        return data;
    }
    return data.filter(item => item.value.includes(value))
}
chinese.params.filter = (data,value) => {
    if (!value) {
        return data;
    }
    return data.filter(item => item.value.includes(value))
}
function preview() {
    const englishFont = $('#english').val();
    const chineseFont = $('#chinese').val();
    let style = '';
    const fontSize = $('#font-size').val() || '';
    if (fontSize) {
        style += `font-size:${fontSize}px;`;
    }
    debugger;
    if (englishFont && chineseFont) {
        style += `font-family: "${englishFont}","${chineseFont}",Serif;`;
    }else if (englishFont) {
        style += `font-family: "${englishFont}",Serif;`;
    }else if (chineseFont) {
        style += `font-family: "${chineseFont}",Serif;`;
    }
    document.getElementById('textarea').style = style;
}
$('#english').on('change', (e) => {
    preview();
})
$('#chinese').on('change', (e) => {
    preview();
})
$('#font-size').on('change', (e) => {
    preview();
})
window.onload = async () => {
    const fontList = await window.fontList.getFonts({disableQuoting: true});
    const {fontSize = '', englishFont = '', chineseFont = '' } = window.UtoolsUtils.read('xiaou_03/setting/font');
    $('#font-size').val(fontSize);
    const options = fontList.map(font => {
        return `<option value="${font}"></option>`
    })
    $('#english').val(englishFont);
    $('#chinese').val(chineseFont);
    $('#english-options').append(options);
    $('#chinese-options').append(options);
    preview();
    $('#reset').on('click', () => {
        utools.db.remove('xiaou_03/setting/font');
        IpcRendererUtils.winClose();
    })
}
window.saveSetting = () => {
    const fontSize = $('#font-size').val() || '';
    const englishFont = $('#english').val() || '';
    const chineseFont = $('#chinese').val() || '';
    console.log({
        fontSize,
        englishFont,
        chineseFont
    })
    window.UtoolsUtils.save('xiaou_03/setting/font', {
        fontSize,
        englishFont,
        chineseFont
    })
}
window.onbeforeunload = () => {
    window.saveSetting();
    IpcRendererUtils.winClose();
}
