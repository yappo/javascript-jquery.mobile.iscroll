/*
 * jQuery Mobile in a iScroll plugin
 * Copyright (c) Kazuhiro Osawa
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * dependency: iScroll 3.7.1 http://cubiq.org/iscroll
 */
/*

-head1 name

iPhone like 'position fixed' header/footer manager

=head1 EXAMPLE

<div data-role="page" data-iscroll="enable" id="index">
  <div data-role="header">
    <h1>INDEX PAGE</h1>
  </div>

  <div data-role="content">
	<div data-iscroll="scroller">
      some contents.
    </div>
  </div>

  <div data-role="footer" class="ui-bar">
	<div data-role="navbar" class="ui-navbar">
	  <ul class="ui-grid-b">
	    <li class="ui-block-a"><a href="#home">home</a></li>
	    <li class="ui-block-a"><a href="#timeline">timeline</a></li>
	    <li class="ui-block-a"><a href="#message">message</a></li>
	    <li class="ui-block-a"><a href="#bookmark">bookmark</a></li>
	    <li class="ui-block-a"><a href="#config">config</a></li>
	  </ul>
	</div>
  </div>
</div>


=cut

 */
(function($) {
$(function() {

var SafariWindowHeightFix = 34; // XXX:

function fixed(elm) {
	if (elm.data("iscroll-plugin")) {
		return;
	}

	// XXX: fix crumbled css in transition changePage 
	// for jquery mobile 1.0a3 in jquery.mobile.navigation.js changePage
	//  in loadComplete in removeContainerClasses in .removeClass(pageContainerClasses.join(" "));
	elm.css({
		overflow: 'hidden'
	});

	var barHeight = 0;
	var $header = elm.find('[data-role="header"]');
	if ($header.length) {
		$header.css({
			"z-index": 1000,
			padding: 0,
			width: "100%"
		});
		barHeight += $header.height();
	}

	var $footer = elm.find('[data-role="footer"]');
	if ($footer.length) {
		$footer.css({
			"z-index": 1000,
			padding: 0,
			width: "100%"
		});
		barHeight += $footer.height();
	}

	var $wrapper = elm.find('[data-role="content"]');
	if ($wrapper.length) {
		$wrapper.css({
			"z-index": 1
		});
		$wrapper.height($(window).height() - barHeight - SafariWindowHeightFix);
		$wrapper.bind('touchmove', function (e) { e.preventDefault(); });
	}

	var scroller = elm.find('[data-iscroll="scroller"]').get(0);
	if (scroller) {
		var iscroll = new iScroll(scroller, {desktopCompatibility:true});
		elm.data("iscroll-plugin", iscroll);
	}
}
$('[data-role="page"][data-iscroll="enable"]').live("pageshow", function() {
	fixed($(this));
});
if ($.mobile.activePage.data("iscroll") == "enable") {
	fixed($.mobile.activePage);
}

});
})(jQuery);