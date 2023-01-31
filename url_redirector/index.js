/*
* @Author: yumu
* @Date:   2020-03-26
* @Email:   yumusb@foxmail.com
* @Last Modified by:   yumu
* @Last Modified time: 2020-03-26
*/

addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request));
})
async function fetchAndApply(request) {
    let requestURL = new URL(request.url)
    let path = requestURL.pathname.slice(1)//获取访问的URL地址，取得的是第一个/之后的内容，如果访问 33.al/a 获取到a （默认忽略掉参数，也就是？之后的内容）
    var url = "https://raw.githubusercontent.com/yumin9822/uy9822/master/url_redirector/redirect.json" // 远程数据，存放JSON文件
    init = {
        method: "GET"
    };
    const response = await fetch(url, init);//请求上面给定的远程JSON
    var json = JSON.parse(await response.text());//解析JSON
    if (json.hasOwnProperty(path)) {
        url = json[path] //如果访问的URL有数据，就取这个URL的值
    } else {
        url = 'https://www.baidu.com' //如果没有给定的URL，就给出一个默认的。
    }
    return Response.redirect(url, 301) //直接跳转，不返回页面。
}
