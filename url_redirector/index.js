/*
* @Author: yumu
* @Date:   2020-03-26
* @Email:   yumusb@foxmail.com
* @Last Modified by:   yumu
* @Last Modified time: 2020-03-26
* Enhanced to support path concatenation
* Manually triggered deploy
*/

addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request));
})

async function fetchAndApply(request) {
    let requestURL = new URL(request.url)
    let fullPath = requestURL.pathname.slice(1) // 获取完整路径，去掉开头的 /
    
    // 远程数据，存放JSON文件 
    // var configUrl = "https://fastly.jsdelivr.net/gh/yumin9822/uy9822@master/url_redirector/redirect.json"
    // var configUrl = "https://ghfast.top/https://raw.githubusercontent.com/yumin9822/uy9822/master/url_redirector/redirect.json"
    // var configUrl = "https://edgeone.gh-proxy.com/https://raw.githubusercontent.com/yumin9822/uy9822/master/url_redirector/redirect.json"
    var configUrl = "https://hk.gh-proxy.com/https://raw.githubusercontent.com/yumin9822/uy9822/master/url_redirector/redirect.json"
    
    const init = {
        method: "GET"
    };
    
    try {
        const response = await fetch(configUrl, init);
        const json = JSON.parse(await response.text());
        
        let redirectUrl = findMatchingUrl(json, fullPath);
        
        return Response.redirect(redirectUrl, 301);
        
    } catch (error) {
        // 如果获取配置失败，跳转到默认页面
        return Response.redirect('https://www.baidu.com', 301);
    }
}

function findMatchingUrl(json, fullPath) {
    // 如果完全匹配，直接返回
    if (json.hasOwnProperty(fullPath)) {
        return json[fullPath];
    }
    
    // 查找最长匹配的前缀
    let bestMatch = '';
    let bestMatchLength = 0;
    
    for (let key in json) {
        // 检查是否是路径的前缀
        if (fullPath.startsWith(key + '/') || fullPath === key) {
            if (key.length > bestMatchLength) {
                bestMatch = key;
                bestMatchLength = key.length;
            }
        }
    }
    
    if (bestMatch) {
        const baseUrl = json[bestMatch];
        // 确保基础URL以/结尾，以便正确拼接
        const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
        // 获取剩余路径
        const remainingPath = fullPath.slice(bestMatch.length + 1);
        
        if (remainingPath) {
            return normalizedBaseUrl + remainingPath;
        } else {
            return baseUrl;
        }
    }
    
    // 如果没有匹配，返回默认URL
    return 'https://www.baidu.com';
}
