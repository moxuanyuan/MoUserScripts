// ==UserScript==
// @name        京东移动端URL跳转到桌面URL
// @namespace   mozl.net
// @match       https://item.m.jd.com/*
// @grant       none
// @run-at      document-start
// @version     0.1
// @author      Mozl
// @description 京东移动端分享的URL，自动跳转到桌面URL
// ==/UserScript==
/*jshint esversion: 6 */
(function () {
		const result = new RegExp(/\/product\/(\d+)\.html/, "i").exec(
      location.pathname
    );
    if (result !== null) {
      location.href = "https://item.jd.com/" + result[1] + ".html";
    }
})();
