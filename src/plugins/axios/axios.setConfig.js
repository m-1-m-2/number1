
// #"axios.setConfig.js"文件

/**
 * @param {axios} axios实例
 * @param {config} 自定义配置对象，可覆盖掉默认的自定义配置
 */
export default (axios, config = {}) => {

    const defaultConfig = {
        baseURL: '/api',
        // baseURL: '/api/' + (process.env.VUE_APP_API_VERSION || 'v1'),
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': '*',
            // 'Access-Control-Allow-Headers': '*',
            // 'Access-Control-Request-Headers': '*',
            // 'custom-defined-header-key': 'custom-defined-header-value',
            // 自定义请求头：对所有请求方法生效
            common: {
                // 'common-defined-key-b': 'custom value: for all methods'
            },
            // 自定义请求头：只对post方法生效
            post: {
                // 'post-custom-key': 'custom value: only for post method'
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            // 自定义请求头：只对get方法生效
            get: {
                // 'get-custom-key': 'custom value: only for get method'
            }
        }
    }

    Object.assign(axios.defaults, defaultConfig, config)
    return axios
}