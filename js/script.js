$.fn.ready( function() {

	$.q("textarea").on("focus", function(){
		
		$("textarea").tabby();
	};
	
	$.q("pre,code").not(".nopaste").each(function(){
		
		$(this).text($(this).html());
	});

	prettyPrint();
});