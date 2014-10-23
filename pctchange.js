;(function($){
	$.fn.extend({
		"region":function(value){
			var srcID = $(this).attr('id');//获得id值
			$(this).replaceWith("<select id='"+srcID+"-province' name="+srcID+"-province></select><select id='"+srcID+"-city' name="+srcID+"-city></select><select id='"+srcID+"-town' name="+srcID+"-town></select>");
			var province = "#" +srcID+"-province";
			var city = "#" +srcID+"-city";
			var town = "#" +srcID+"-town";
			
			if(value != null && value.code != ''){
				$.getJSON("http://ytulip.duapp.com/public/pct/getpctcode.php?callback=?",{},function(jsondata){
					$(jsondata).each(function(index, element) {
			            var val = jsondata[index];
						$(province).append('<option value="'+val.code+'">'+val.name+'</option>');
			        });
					var provinceCode = parseInt(value.code/10000)*10000;
                    $(province).val(provinceCode);
					});
				$.getJSON("http://ytulip.duapp.com/public/pct/getpctcode.php?callback=?&type=1&code="+ parseInt(value.code/10000)*10000,{},function(jsondata){
					$(jsondata).each(function(index, element) {
			            var val = jsondata[index];
						$(city).append('<option value="'+val.code+'">'+val.name+'</option>');
			        });
                    var cityCode = parseInt(value.code/100)*100;
                    $(city).val(cityCode);
					});
				$.getJSON("http://ytulip.duapp.com/public/pct/getpctcode.php?callback=?&type=2&code="+parseInt(value.code/100)*100,{},function(jsondata){
					$(jsondata).each(function(index, element) {
			            var val = jsondata[index];
						$(town).append('<option value="'+val.code+'">'+val.name+'</option>');
			        });
					$(town).val(value.code);
					});
			}else{
			
			$.getJSON("http://ytulip.duapp.com/public/pct/getpctcode.php?callback=?",{},function(jsondata){
		$(jsondata).each(function(index, element) {
            var val = jsondata[index];
			//alert(val.name);
			$(province).append('<option value="'+val.code+'">'+val.name+'</option>');
        });
		$(province).trigger("change");
		});
			}
		
		$(province).change(function(){
			//alert($(this).val());
			$(city).text('');
			$.getJSON("http://ytulip.duapp.com/public/pct/getpctcode.php?callback=?&type=1&code="+$(this).val(),{},function(jsondata){
				$(jsondata).each(function(index, element) {
                    var val = jsondata[index];
					$(city).append('<option value="'+val.code+'">'+val.name+'</option>');
                });
				//手动触发city的changed事件
				$(city).trigger("change");
				
				});
		});
		
		$(city).change(function(){
			//alert($(this).val());
			$(town).text('');
			$.getJSON("http://ytulip.duapp.com/public/pct/getpctcode.php?callback=?&type=2&code="+$(this).val(),{},function(jsondata){
				$(jsondata).each(function(index, element) {
                    var val = jsondata[index];
					$(town).append('<option value="'+val.code+'">'+val.name+'</option>');
                });
				});
		});
		}
	});
})(jQuery);