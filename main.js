function prdTmplt(title,price,imgsrc,link,site,prdid) {
    w = '';
    w += '<div class="row mt-5 shadow-sm p-2">';
    w += '<div class="search-img-div">';
    w += '<img src="'+imgsrc+'" class="img-fluid">';
    w += '</div><div class="search-info-div">';  
    w += '<a href="'+link+'" class="prd-form-submit btn text-left btn-link" style="margin-left: -1rem;"><h4>'+title+'</h4></a><br>';
    w += '<span>$'+price+'</span>';
    w += '<a href="'+link+'" class="btn btn-success float-right btn-bn" target="blank">Buy Now</a><img src="ebay.png" class="btn-bn-logo float-right" goto="https://'+site+'.com">';
    w += '</div></div>';

    return w;

    //return $('#prd-dmp').append(w);
}

$('.search').click(function(){
	var sd = $('.sd').val();

	if (!sd) {
		$('.sd_err').text('Empty input given');
	}else{
		$('.sd_err').text('');
		$('.load_img').show();
		console.log(sd);
		var query = sd.replace(" ", "+");
		console.log(query);

		stres = [];
		$.ajax({
            url: 'http://best-price-web.herokuapp.com/scraper',
            method: 'post',
            data: {q:query, site:'ebay'},
            success: function(data){
                jsdt = JSON.parse(data);
                console.log(jsdt);
                num_rw = Object.keys(jsdt['itm']).length;
                for (i=0; i < num_rw; i++) {
                    title = jsdt['itm'][i]['title'];
                    img = jsdt['itm'][i]['img'];
                    price = jsdt['itm'][i]['price'];
                    link = jsdt['itm'][i]['newlink'];
                    site = jsdt['itm'][i]['site'];
                    
                    stres += prdTmplt(title,price,img,link,site,i);   
                }
            }
        });

        setTimeout(function (){
			$('.load_img').hide();
            $('.prd-dmp').append(stres);
        }, 8000);		
	}
});