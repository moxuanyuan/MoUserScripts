// ==UserScript==
// @name         JD Auto Comment
// @namespace    http://mozl.net
// @version      1.0
// @description  京东评论自动填写
// @author       Mozl
// @match        http*://club.jd.com/myJdcomments/orderVoucher.action*
// @match        http*://club.jd.com/myJdcomments/myJdcomment.action*
// @match        http*://club.jd.com/myJdcomments/saveCommentSuccess.action*
// @run-at       document-end
// @grant        none
// ==/UserScript==
/* jshint -W097 */

(function() {
    'use strict';

	var defaultComments=[
		"东西不错，习惯好评。",
		"帮人买的，习惯好评。",
		"买了多次，习惯好评。",
		"京东加油，习惯好评。",
		"还可以吧，参加活动的。",
		"京东的重度用户，习惯好评。"
		],

    	defComUpper=defaultComments.length-1,
    	rdFactor=0,
    	$obj;

	$(function(){

		setTimeout(function(){

			if($('.mycomment-table').length==1)
			{
				$('.mycomment-table .btn-def').attr('target','');

			}else if($('.mycomment-form').length==1)
			{
				$(".commstar .star.star5").trigger('click');

				$('.f-goods .fi-operate').each(function(){
					var $items=$(this).find('.tag-item'),
						itemNum=$items.length,
						itemNumUpper=itemNum-1,
						tagText='',
						comments=[];

					rdFactor=itemNum>2?rd(1,5):1;
					while(rdFactor)
					{
						$obj=$items.eq(rd(0,itemNumUpper));
						if(!$obj.hasClass('.tag-checked'))
						{
							$obj.trigger('click');
							rdFactor--;
						}
					}

					rdFactor=rd(3,6);

					if(rdFactor>itemNum)
					{
						rdFactor=itemNum;
					}

					while(rdFactor)
					{
						tagText=$items.eq(rd(0,itemNumUpper)).text();

						if($.inArray(tagText,comments)===-1)
						{
							comments.push(tagText);
							rdFactor--;
						}
					}


					if(comments.length<3 || rd(0,4)===0)
					{
						comments.push(defaultComments[rd(0,defComUpper)]);
					}

					$(this).find('.f-textarea textarea').val(comments.join('，'));

					setTimeout(function(){
						$('.btn-submit').trigger('click');
					},rd(500,800));

				});
			}else if($('.mycomment-detail .m-success-tip').length==1)
			{
				location.href="https://club.jd.com/myJdcomments/myJdcomment.action";
			}
		},500);
	});

    function rd(n,m){
        var c = m-n+1;
        return Math.floor(Math.random() * c + n);
    }


})();
