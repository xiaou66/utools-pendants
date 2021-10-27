const useragentDict = {
    phone: 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36',
    pc: 'Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13',
    mac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
}
const winSizePreinstall = {
    phone: [
        {id: 1, name: 'iPhone 6/7/8', value: { width: 414, height: 736 }},
        {id: 2, name: 'iPhone 11 Pro', value: { width: 375, height: 812 }},
        {id: 3, name: 'HUAWEI Mate30 Pro', value: { width: 392, height: 800 }},
        {id: 4, name: 'HUAWEI Mate30', value: { width: 360, height: 780 }},
        {id: 5, name: 'HUAWEI P10', value: { width: 360, height: 640 }},
        {id: 6, name: 'Google Pixel', value: { width: 411, height: 731 }},
    ],
    pc: [
        { id: 1, name: '800x600', value: { width: 800, height: 600 } }
    ]
};
export {
    winSizePreinstall,
    useragentDict
}
