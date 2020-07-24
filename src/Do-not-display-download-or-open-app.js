// ==UserScript==
// @name        Do not show download or open app
// @namespace   mozl.net
// @grant       GM_addStyle
// @version     0.3.2
// @author      Mozl
// @description 移动版网页不显示下载或打开APP
// @match       *://juejin.im/*
// @match       *://*.toutiao.io/*
// @match       *://*.m.smzdm.com/*
// @match       *://m.xiachufang.com/*
// ==/UserScript==
/*jshint esversion: 6 */
(function () {
    const rules = [
        {
            // 掘金 - 移动端文章列表页面
            regs: [
                /^http(s)?:\/\/juejin\.im(\/welcome(\/\w+)?)?(\/)?$/i
            ],
            remove:[
                '.mobile-bottom-bar'
            ]
        },
        {
            // 掘金 - 移动端文章
            regs: [
                /^http(s)?:\/\/juejin\.im\/post\/\w+/i
            ],
            remove:[
                '.open-in-app'
            ]
        },
        {
            // 开发者头条 - 移动端 
            regs: [
                /^http(s)?:\/\/(\w+\.)?toutiao\.io(\/\w+)?(\/)?/i
            ],
            remove:[
                '#quick-download'
            ]
        },
        {
            // 什么值得买 - 移动端页面
            regs: [
                /^http(s)?:\/\/(\w+\.)?m.smzdm\.com(\/\w+)?(\/)?/i
            ],
            remove:[
                '.footer-banner','.foot-banner > .download-normal','.download-mini.J_ota'
            ]
        },
        {
            // 下厨房 - 移动端页面
            regs:  ],
            remove:[]
        }

    ]
    for (let rule of rules) {
        for(let reg of rule.regs){
            if (reg.test(window.location.href)) {
                GM_addStyle(
                  (rule.remove
                    ? rule.remove.join(',\n') +
                      ` {
                        display: none!important;
                      }\n`
                    : ``) + 
                    (rule.style ? rule.style : ``)
                );
                return;
            }
        }
    }
})()
