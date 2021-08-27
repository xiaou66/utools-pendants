const osUtils = require("node-os-utils");
const os = require("os");
/**
 * totalMemMb         内存总量
 * usedMemMb          已经使用内存
 * freeMemMb          空闲内存
 * usedMemPercentage  使用内存占比
 * freeMemPercentage  空闲内存占比
 * @return {Promise<>}
 */
const getMemoryInfo = async () => {
    const mem = osUtils.mem;
    return await mem.info();
}
/**
 *
 * @return {Promise<{average: *, averageUsage: *, free: *}>}
 */
const getCpuInfo = async () => {
    const cpu = osUtils.cpu
    const average = await cpu.average()
    const averageUsage = await cpu.usage();
    const free = await cpu.free();
    return {
        average,
        averageUsage,
        free
    }
}

module.exports = { getMemoryInfo, getCpuInfo }
