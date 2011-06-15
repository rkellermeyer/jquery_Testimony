/*
 *
 * Copyright (c) 2010/2011 Richard Kellermeyer (http://www.rnkconcepts.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Version 0.1a
 *
 * $LastChangedDate: 2010-08-04 10:11:45 -0500 (Wed, 04 August 2010) $
 * $Rev: 2010 $
 *
 */
 (function($) {
$.fn.Testimony = $.fn.Testimony = function(delay)
{
	delay = delay || 4000;
	initTestimony = function(el)
	{
		stopTestimony(el);
		el.items = $("li", el);
		// Show Only Testimony #1
		el.items.not(":eq(0)").hide().end();
		// current item
		el.currentitem = 0;
		startTestimony(el);
	};
	startTestimony = function(el)
	{
		el.Testyfn = setInterval(function() { doTesty(el) }, delay)
	};
	stopTestimony = function(el)
	{
		clearInterval(el.Testyfn);
	};
	pauseTestimony = function(el)
	{
		el.pause = true;
	};
	resumeTestimony = function(el)
	{
		el.pause = false;
	};
	doTesty = function(el)
	{
		// don't run if paused
		if(el.pause) return;
		// pause until animation has finished
		el.pause = true;
		// hide current item
		$(el.items[el.currentitem]).fadeOut("slow",
			function()
			{
				$(this).hide();
				// move to next item and show
				el.currentitem = ++el.currentitem % (el.items.size());
				$(el.items[el.currentitem]).fadeIn("slow",
					function()
					{
						el.pause = false;
					}
				);
			}
		);
	};
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase()!= "ul") return;
			initTestimony(this);
		}
	)
	.addClass("Testimony")
	.hover(
		function()
		{
			// pause if hovered over
			pauseTestimony(this);
		},
		function()
		{
			// resume when not hovered over
			resumeTestimony(this);
		}
	);
	return this;
};

})(jQuery);