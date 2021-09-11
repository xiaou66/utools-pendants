const fs = require('fs');
const path = require('path')


function getConfig() {
    const myAppPath = path.resolve(__dirname, 'pendants');
    const configs = fs.readdirSync(myAppPath)
        .map(name => path.resolve(myAppPath, name))
        .filter(path => {
            const stat = fs.statSync(path)
            return stat.isDirectory();
        }).map(directory => {
            const configFile = path.resolve(directory, 'config.json');
            const data = fs.readFileSync(configFile);
            const item = JSON.parse(data);
            item.src = path.resolve(directory, item.src).replace(__dirname, '.')
            if (item.options && item.options.webPreferences && item.options.webPreferences.preload) {
                item.options.webPreferences.preload = path.resolve(directory, item.options.webPreferences.preload)
                    .replace(__dirname, '.')
            }
            // setting
            if (item.setting) {
                item.setting.src = path.resolve(directory, item.setting.src).replace(__dirname,  '.');
                if (item.setting.options && item.setting.options.webPreferences && item.setting.options.webPreferences.preload) {
                    item.setting.options.webPreferences.preload = path.resolve(directory, item.setting.options.webPreferences.preload)
                        .replace(__dirname, '.')
                }
            }
            item.title += `|作者:${item.author}`
            const tag = `「${item.single ? '单例' : '多例'}」`;
            item.description = tag + item.description;
            return item;
        }).map(item => {item.single === undefined ? true : item.single; return item})
        .filter(item => !item.hide)
    console.log(configs);
    return configs;
}
/**
 * id: 唯一字符
 * title: 标题
 * description: 描述
 * author: 作者
 */
const pendantsConfig = [
    ...getConfig()
]
module.exports = { pendantsConfig };
