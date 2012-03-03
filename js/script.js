$.fn.ready( function() {

	$.q("pre,code").not(".nopaste").each(function(){
		
		$(this).text($(this).html());
	});

	prettyPrint();
});