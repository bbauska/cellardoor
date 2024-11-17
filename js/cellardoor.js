$('#growbox').click(function(){
  $('#box').animate({width: '710px'});
});
		  
$('#growtext').click(function(){
  $('#box').animate({fontSize: '24px'}, 1000);
});
		  
$('#movebox').click(function(){
  $('#box').animate({left: '+=300px'}, 5000 );
});
		  
$('#doall').click(function(){
  $('#box').animate({width: '710px', fontSize: '36px', left: '+=300px'}, 1500 );
});
