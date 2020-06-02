// ==UserScript==
// @name         雪球新股高亮
// @namespace    http://mozl.net
// @version      0.1
// @description   雪球新股申购页面高亮显示当天的新股
// @author       Mozl
// @match        https://xueqiu.com/hq
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    if(location.href=='https://xueqiu.com/hq#exchange=CN&plate=xgsg&firstName=hsgs&secondName=xgss')
    {
    	var css = [
    		".newstock-view-table .past td{",
    		"	 	background-color:#eee!important;",
    		"	}",
    		".newstock-view-table .today td{",
    		"	 	background-color:#ffff00!important;",
    		"	}",
    		".newstock-view-table .tomorrow td{",
    		"	 	background-color:#e2efda!important;",
    		"	}"
    	].join("\n");

    	if (typeof GM_addStyle != "undefined") {
    		GM_addStyle(css);
    	} else if (typeof PRO_addStyle != "undefined") {
    		PRO_addStyle(css);
    	} else if (typeof addStyle != "undefined") {
    		addStyle(css);
    	} else {
    		var node = document.createElement("style");
    		node.type = "text/css";
    		node.appendChild(document.createTextNode(css));
    		var heads = document.getElementsByTagName("head");
    		if (heads.length > 0) {
    			heads[0].appendChild(node);
    		} else {
    			// no head yet, stick it whereever
    			document.documentElement.appendChild(node);
    		}
    	}

    	// var target = document.querySelector('.tableContainer.new-portfolio');
    	var target = document.querySelector('#stockList');

    	var observer = new MutationObserver(function(mutations) {
    	  mutations.forEach(function(mutation) {
    	    	  var addedNodeList = mutation.addedNodes;
    	          var filter = [].filter;
    	          var viewTable = filter.call(addedNodeList, function(node) {
    	            return (node.className === 'tableContainer new-portfolio table-overflow cloneContainer kzz');
    	          });

    	          if (viewTable.length > 0) {
    	          		var today=new Date(),
    	          		    todayText=dateFormat(today),
    	          		    tomorrowText=dateFormat(new Date(today.getTime() + 24 * 60 * 60 * 1000));

	    	          	$('.newstock-view-table').find("tbody tr").each(function(e){
	    	          		var $t=$(this),
	    	          		    dateText=$t.find('td:eq(2)').text();
	    	          		if(dateText==todayText)
	    	          		{
	    	          			$t.addClass('today');
	    	          		}else if(dateText==tomorrowText)
	    	          		{
	    	          			$t.addClass('tomorrow');
	    	          		}else if(dateText < todayText)
	    	          		{
	    	          			$t.addClass('past');
	    	          		}

	    	          	});
    	            observer.disconnect();
    	          }
    	  });
    	});

    	var config = {
    		attributes: true,
    		childList: true,
    		characterData: true
    	}
    	observer.observe(target, config);
    }

    function dateFormat(d)
    {
    	var text=d.getFullYear(),
    	    month=parseInt(d.getMonth())+1,
    	    day=parseInt(d.getDate());

	    text+='-'+(month < 10 ? '0'+month:month);
	    text+='-'+(day < 10 ? '0'+day:day);
	    return text;
    }

})();
