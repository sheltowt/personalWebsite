var pixleeInfo = {

  api: "http://api.pixlee.com/v1/HackReactor/albums/",

  //#sfgiants
  // albumID: 1242,

  //#summer
  albumID: 1320,

  ajaxData: {
    api_key: 'SPsSUOe6jIQgGw1de7q2',
    per_page: 100,
    page: 1,
    sort: 'recent'
  }
};

var options = {

  //set scroll direction (options: horiz, vert)
  scroll: "horiz",

  //set scroll speed (options: slow, medium, fast)
  scrollSpeed: "slow",

  //display random imgs in featured overlay (options: true - on, false - off)
  feature: true,

  //select # of rows to display in window (number)
  numRows: 5,

  //padding between hexagon tesselation (number)
  hexPadding: 10,

  //hashtag of image search
  // hashtag: 'sfgiants',
  hashtag: 'coke',

  topRow: {

    //text to display in top row of hexagons (defaults to hashtag)
    text1: undefined,
    text2: undefined,

    //alternate background colors for top row of hexagons
    // bgColor1: 'slategrey',
    // bgColor2: '#ff6e00'
    // bgColor1: '#00ff2e',
    // bgColor2: '#66bcff',
    bgColor1: 'red',
    bgColor2: 'white',

    //background img for top row of hexagons
    bgImgUrl1: undefined,
    bgImgUrl2: undefined

  },

  bottomRow: {

    //text to display in bottom row of hexagons (defaults to hashtag)
    text1: undefined,
    text2: undefined,

    //alternate background colors for bottom row of hexagons
    bgColor1: undefined,
    bgColor2: undefined,

    //background img for bottom row of hexagons
    bgImgUrl1: undefined,
    bgImgUrl2: undefined

  }

};

var imgCollection = [];

var dimensions = {
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth
};

dimensions.hexHeight = (2 * dimensions.windowHeight) / (options.numRows + 1) - (options.hexPadding/Math.sqrt(3)) + (options.hexPadding/(Math.sqrt(3)*options.numRows));
dimensions.hexWidth = (dimensions.hexHeight * Math.sqrt(3)) + options.hexPadding;

var $honeycomb = $('.honeycomb');
$honeycomb.css({'height': dimensions.windowHeight});
$('body').css({'width': '99999999px'});
window.scroll(0, 0);
var $img;
var $featured = $('.featured');
var $border = $('<div class="border"></div>');

var getImages = function(url, callback, albumID, data) {
  data = data || {};
  url += albumID;
  $.ajax({
    url: url,
    data: data,
    dataType: 'jsonp',
    success: function(response){
      console.log(response);
      imgCollection = response.data;
      callback(response.data);
    },
    error: function(error) {
      callback(error);
    }
  });
};

var renderHoneycomb = function(images) {
  var counter = 0;
  var $row;
  for (var i = 0; i < options.numRows; i++) {
    if (i % 2 === 0) {
      $row = $('<div class="hex-row" id="row-'+i+'" style="top:'+(i * ((dimensions.hexHeight/2) + (options.hexPadding/Math.sqrt(3)/2)))+'px; left:'+(dimensions.hexWidth/2)+'px"></div>');
    } else {
      $row = $('<div class="hex-row" id="row-'+i+'" style="top:'+(i * ((dimensions.hexHeight/2) + (options.hexPadding/Math.sqrt(3)/2)))+'px;"></div>');
    }
    for (var j = 0, l = Math.floor(images.length/options.numRows); j < l; j++) {
      var image = images[counter];
      $row.append('<div class="hexagon" id="'+i+'-'+j+'" style="width:'+dimensions.hexWidth+'px; height:'+dimensions.hexHeight+'px">'+
                     '<div class="hex-inner1">'+
                       '<div class="hex-inner2" style="background-image: url('+image.url+')">'+
                         '<span class="hex-text username"><i class="icon-'+image.socialnetwork+'"></i> @'+image.username+'</span>'+
                       '</div>'+
                    ' </div>'+
                  ' </div>');
      counter++;
    }
    $honeycomb.append($row);
  }
  $specialRow = $('<div class="hex-row" id="top-row" style="top:'+(-((dimensions.hexHeight/2) + (options.hexPadding/Math.sqrt(3)/2)))+'px;"></div>');
  $bottomRow = options.numRows % 2 ? $('<div class="hex-row" id="bottom-row" style="top:'+(options.numRows * ((dimensions.hexHeight/2) + (options.hexPadding/Math.sqrt(3)/2)))+'px;"></div>') : $('<div class="hex-row" id="row-special" style="top:'+(options.numRows * ((dimensions.hexHeight/2) + (options.hexPadding/Math.sqrt(3)/2)))+'px; left:'+(dimensions.hexWidth/2)+'px"></div>');
  for (var k = 0, q = Math.floor(images.length/options.numRows); k < q; k++) {

    var topRowBGColor = k % 2 ? options.topRow.bgColor1 : options.topRow.bgColor2;
    $specialRow.append('<div class="hexagon" style="width:'+dimensions.hexWidth+'px; height:'+dimensions.hexHeight+'px">'+
                        '<div class="hex-inner1">'+
                          '<div class="hex-inner2 inner-special" style="background-color: '+topRowBGColor+'">'+
                            '<span class="hex-text hashtag">all #coke</span>'+
                          '</div>'+
                        ' </div>'+
                      ' </div>');
    var bottomRowBGColor = k % 2 ? options.bottomRow.bgColor1 : options.bottomRow.bgColor2;
    $bottomRow.append('<div class="hexagon" style="width:'+dimensions.hexWidth+'px; height:'+dimensions.hexHeight+'px">'+
                        '<div class="hex-inner1">'+
                          '<div class="hex-inner2 inner-special" style="background-color: '+bottomRowBGColor+'">'+
                          '</div>'+
                        ' </div>'+
                      ' </div>');
  }
  $honeycomb.prepend($specialRow);
  $honeycomb.append($bottomRow);
};

var addToHoneyComb = function(images, text) {
  var counter = 0;
  var $row;
  for (var i = 0; i < options.numRows; i++) {
    $row = $('#row-'+i);
    for (var j = 0, l = Math.floor(images.length/options.numRows); j < l; j++) {
      var image = images[counter];
      $row.append('<div class="hexagon" style="width:'+dimensions.hexWidth+'px; height:'+dimensions.hexHeight+'px">'+
                     '<div class="hex-inner1">'+
                       '<div class="hex-inner2" style="background-image: url('+image.url+')">'+
                         '<span class="hex-text username"><i class="icon-'+image.socialnetwork+'"></i> @'+image.username+'</span>'+
                       '</div>'+
                    ' </div>'+
                  ' </div>');
      counter++;
    }
  }
  $specialRow = $('#top-row');
  $bottomRow = $('#bottom-row');
  for (var k = 0, q = Math.floor(images.length/options.numRows); k < q; k++) {
    var bgColor = k % 2 ? options.bgColor1 : options.bgColor2;
    $specialRow.append('<div class="hexagon" style="width:'+dimensions.hexWidth+'px; height:'+dimensions.hexHeight+'px">'+
                        '<div class="hex-inner1">'+
                          '<div class="hex-inner2 inner-special" style="background-color: '+bgColor+'">'+
                            '<span class="hex-text hashtag">'+text+'</span>'+
                          '</div>'+
                        ' </div>'+
                      ' </div>');
    $bottomRow.append('<div class="hexagon" style="width:'+dimensions.hexWidth+'px; height:'+dimensions.hexHeight+'px">'+
                        '<div class="hex-inner1">'+
                          '<div class="hex-inner2 inner-special">'+
                          '</div>'+
                        ' </div>'+
                      ' </div>');
  }
};

var electricSlide = function() {
  var scrollBy, millis;
  if (options.scrollSpeed === "slow") {
    scrollBy = 1;
    millis = 50;
  } else if (options.scrollSpeed === "medium") {
    scrollBy = 1;
    millis = 25;
  } else if (options.scrollSpeed === "fast") {
    scrollBy = 1;
    millis = 10;
  }
  window.slide = setInterval(function() {
    window.scrollBy(scrollBy, 0);
  }, millis
  );
};

var highlightImg = function(image) {
  var rotate = Math.random() * 11;
  rotate = Math.floor(Math.random() * 2) ? -rotate : rotate;
  $honeycomb.css({'opacity': 0.3});
  $img = $('<img>');
  $img.attr('src', image.photo.photo_url);
  $username = $('<div class="overlay featured-username"><i class="icon-'+image.photo.photo_source+'"></i> @'+image.photo.photo_submitter+'</div>');
  $description = $('<div class="overlay image-description">'+image.photo.title+'</div>');
  $border.empty()
         .append($username)
         .append($img)
         .append($description);
  $featured.css({'-webkit-transform': 'rotate('+rotate+'deg)'})
         .append($border.css({'opacity': 1}));
  setTimeout(function() {
    $honeycomb.css({'opacity': 1.0});
    $featured.css({'-webkit-transform': 'rotate(0deg)'}).empty();
  }, 5000);
};

// getImages(pixleeInfo.api, renderHoneycomb, pixleeInfo.albumID, pixleeInfo.ajaxData);

// setTimeout(electricSlide, 1000);

// setTimeout(function() {

//   if (options.feature) {
//     setInterval(function() {
//       var random = Math.floor(Math.random() * images.length);
//       var image = images[random];
//       highlightImg(image);
//     }, 10000);
//   }

//   setInterval(function() {
//     getImages(pixleeInfo.api, addToHoneyComb, pixleeInfo.albumID, pixleeInfo.ajaxData);
//   }, (60000 * 3));
// }, 9000);


var allImages = [{"url": "http://distilleryimage1.s3.amazonaws.com/94e5cd4ad93211e2876222000a9f0a1b_7.jpg", "username": "alessiadizio", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/9c109a64d93211e2a0c022000a1f918d_7.jpg", "username": "grazicardozo", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/7fa21ac4d93211e2bdce22000aaa0927_7.jpg", "username": "silvi8o", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/3312301ed93111e2928c22000a9f3092_7.jpg", "username": "valeeriia0", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/2d1cb98ad93211e2ab6822000a1fbc38_7.jpg", "username": "tmavigno", "socialnetwork": "instagram"}, {"url": "http://distilleryimage6.s3.amazonaws.com/a939849ed93211e28aa822000a1fd52c_7.jpg", "username": "beybeyxxx", "socialnetwork": "instagram"}, {"url": "http://distilleryimage11.s3.amazonaws.com/fd4e9b7ed93111e2a47422000a9e28eb_7.jpg", "username": "sanulqa8", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/75d3bdead93211e2844522000a1d1fdc_7.jpg", "username": "lyse_emmy", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/cfd56208d93211e2a68422000a1fb163_7.jpg", "username": "hectoralejandrosantiago", "socialnetwork": "instagram"}, {"url": "http://distilleryimage9.s3.amazonaws.com/c9d2e52ed93211e2942f22000a9f140e_7.jpg", "username": "adriana_merc", "socialnetwork": "instagram"}, {"url": "http://pbs.twimg.com/media/BNKEsfACMAAY4ua.jpg:large", "username": "Martinmur", "socialnetwork": "twitter"}, {"url": "http://pbs.twimg.com/media/BNKFVpRCYAAXYJh.jpg:large", "username": "DreamiSht", "socialnetwork": "twitter"}, {"url": "http://distilleryimage1.s3.amazonaws.com/08db6cced93211e2b30a22000aa80109_7.jpg", "username": "beira_", "socialnetwork": "instagram"}, {"url": "http://distilleryimage10.s3.amazonaws.com/e2561beed93111e28a3222000a9f17b2_7.jpg", "username": "brunadisseoi", "socialnetwork": "instagram"}, {"url": "http://distilleryimage0.s3.amazonaws.com/12a0650cd93211e2a82b22000a9f1408_7.jpg", "username": "karolmartinez", "socialnetwork": "instagram"}, {"url": "http://distilleryimage9.s3.amazonaws.com/dd7edc32d93111e2b42122000a9d0ed9_7.jpg", "username": "ely_96_", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/1f162f92d93211e2901022000a9e13ab_7.jpg", "username": "jessy_ep", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/46d56c0ad93211e2990022000aeb0f0c_7.jpg", "username": "kap_u_moru", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/55a09566d93211e28e8322000a1f9686_7.jpg", "username": "luannafrade", "socialnetwork": "instagram"}, {"url": "http://distilleryimage0.s3.amazonaws.com/1f33d6c8d93211e2880f22000a1f9ca7_7.jpg", "username": "gazman56", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/e9481d06d91f11e28a7322000a1fa414_7.jpg", "username": "dangermouse40oz", "socialnetwork": "instagram"}, {"url": "http://distilleryimage11.s3.amazonaws.com/a5eddb96d80b11e2983d22000a9f199e_7.jpg", "username": "jodie_molloy", "socialnetwork": "instagram"}, {"url": "http://distilleryimage11.s3.amazonaws.com/d1042070d93111e2a2d522000a1fb04d_7.jpg", "username": "exelmoney", "socialnetwork": "instagram"}, {"url": "http://distilleryimage9.s3.amazonaws.com/7dd0de1ad93211e2bccc22000a1f8cda_7.jpg", "username": "ivan_tato", "socialnetwork": "instagram"}, {"url": "http://distilleryimage0.s3.amazonaws.com/81f0b5a6d93211e289bf22000a1fa4a9_7.jpg", "username": "kikiluvspandasx3", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/5a3283e6d93211e2a73f22000a9e28ad_7.jpg", "username": "nataliii98", "socialnetwork": "instagram"}, {"url": "http://distilleryimage10.s3.amazonaws.com/afd8e548d93111e2a94622000a1fbd9f_7.jpg", "username": "diianananiis", "socialnetwork": "instagram"}, {"url": "http://distilleryimage6.s3.amazonaws.com/41c944a8d93111e293e422000aaa09ed_7.jpg", "username": "djitaygalila", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/d6cf498ad93111e2a2e022000a1faf45_7.jpg", "username": "katyasheldon", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/6bb8afe2d93111e293c522000a9f4d92_7.jpg", "username": "neutralize_91", "socialnetwork": "instagram"}, {"url": "http://distilleryimage4.s3.amazonaws.com/a7d17694d93111e2911522000a9e087e_7.jpg", "username": "dianabarinova99", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/e893b9f4d93011e2abd122000ae907cd_7.jpg", "username": "rafaelamarcon", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/d328917ed93111e28ac522000a9f141e_7.jpg", "username": "palaanna", "socialnetwork": "instagram"}, {"url": "http://distilleryimage4.s3.amazonaws.com/a1fb4d62d93111e2b55d22000a9e0010_7.jpg", "username": "trgringo", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/bfdf2ddad93111e282b422000a1f9ab7_7.jpg", "username": "platonicmoon", "socialnetwork": "instagram"}, {"url": "http://distilleryimage4.s3.amazonaws.com/4a95f96ed93111e2b44922000a1fb8f9_7.jpg", "username": "meroninc", "socialnetwork": "instagram"}, {"url": "http://distilleryimage11.s3.amazonaws.com/e17cfa4ed93111e2a52322000a9e02f9_7.jpg", "username": "secretly_lord_satan", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/ccb47a60d93111e285a622000a1f9e5b_7.jpg", "username": "giuliasasse", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/f38da094d93111e2906622000a9e03eb_7.jpg", "username": "antoxa2142", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/0ef2ea86697711e2b16122000a1f9e61_7.jpg", "username": "alexey_kazmin", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/03b5afcad93211e286a022000a9e06e7_7.jpg", "username": "katyasheldon", "socialnetwork": "instagram"}, {"url": "http://distilleryimage10.s3.amazonaws.com/1c07e53ad93111e2aa5e22000a1f96ec_7.jpg", "username": "michele_bruno_o", "socialnetwork": "instagram"}, {"url": "http://distilleryimage4.s3.amazonaws.com/558b832ad93111e2961e22000aa81fac_7.jpg", "username": "alexmoldest", "socialnetwork": "instagram"}, {"url": "http://distilleryimage9.s3.amazonaws.com/5d67c55ed93111e296c422000a9e0891_7.jpg", "username": "inzanemusic", "socialnetwork": "instagram"}, {"url": "http://distilleryimage2.s3.amazonaws.com/3be9ed6cd93111e2912622000a9f307a_7.jpg", "username": "leincamara", "socialnetwork": "instagram"}, {"url": "http://distilleryimage6.s3.amazonaws.com/feb95252d93011e2872f22000a9e064b_7.jpg", "username": "casaazulcasarosa", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/016fdbbad93111e29c7e22000a9e5de5_7.jpg", "username": "sweetsheri1980", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/51d23558d93111e2a2af22000a9f14a5_7.jpg", "username": "hoyesen", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/87dbc268d93111e289b122000a9f18c4_7.jpg", "username": "nobooboo", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/7087631ad93111e2838b22000ae81190_7.jpg", "username": "belgradeclubbing", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/385b5baed93111e28ea222000a9f1946_7.jpg", "username": "patibermejo13", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/6876a852d93111e285f822000a9e5e0a_7.jpg", "username": "michel_pauline", "socialnetwork": "instagram"}, {"url": "http://distilleryimage10.s3.amazonaws.com/0aa540bc87d911e18cf91231380fd29b_7.jpg", "username": "ciprianxl", "socialnetwork": "instagram"}, {"url": "http://distilleryimage11.s3.amazonaws.com/53ad1e6ad93111e2868a22000a9f18a6_7.jpg", "username": "larybaena", "socialnetwork": "instagram"}, {"url": "http://distilleryimage4.s3.amazonaws.com/9e0b8b18d93111e283e322000a9f1948_7.jpg", "username": "jasminecalvi", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/762ec1bed93111e2b96122000aa802d9_7.jpg", "username": "lindaerriu_", "socialnetwork": "instagram"}, {"url": "http://distilleryimage6.s3.amazonaws.com/70d8a05ad93011e2957722000a1f9a39_7.jpg", "username": "matijaub", "socialnetwork": "instagram"}, {"url": "http://distilleryimage0.s3.amazonaws.com/9b0b6100d93011e2963d22000a1f9cad_7.jpg", "username": "luismdiazb", "socialnetwork": "instagram"}, {"url": "http://distilleryimage9.s3.amazonaws.com/58758e7ed93011e284fa22000a1f9c87_7.jpg", "username": "mirna_estrada", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/e1701654d93011e2b62722000a1fbc10_7.jpg", "username": "_wild_child_666_", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/87a4949ed91511e292c922000a1fb771_7.jpg", "username": "emelieclark", "socialnetwork": "instagram"}, {"url": "http://distilleryimage10.s3.amazonaws.com/54b0662ed93011e2a64d22000a9f1590_7.jpg", "username": "katerina_fly", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/d77ddac8d93011e29d0222000a1fbc0c_7.jpg", "username": "giosefsabatini", "socialnetwork": "instagram"}, {"url": "http://distilleryimage2.s3.amazonaws.com/bf1ae7dcd93011e2a93822000ae9025c_7.jpg", "username": "joceyyy_franco", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/4b4fe982d92211e29ad122000aa8027e_7.jpg", "username": "mamaredbird", "socialnetwork": "instagram"}, {"url": "http://distilleryimage11.s3.amazonaws.com/ed3523a8d93011e2aa6722000a9f393e_7.jpg", "username": "gulsen_celik", "socialnetwork": "instagram"}, {"url": "http://distilleryimage11.s3.amazonaws.com/f0f146cad93011e2b55d22000a9e0010_7.jpg", "username": "paoolaaam", "socialnetwork": "instagram"}, {"url": "http://distilleryimage10.s3.amazonaws.com/c99e3c7cd93011e2b74e22000a9e07d7_7.jpg", "username": "danzelcarrare", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/9bafde60d93011e2af3622000a9f17ea_7.jpg", "username": "paulinolr", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/07b11338d82b11e297bf22000a1f9263_7.jpg", "username": "kjarlajn", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/e84d53ced93011e2a97a22000a9f18aa_7.jpg", "username": "sandrapoffi_", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/295e1b10d93011e2a37d22000a9f50cd_7.jpg", "username": "gabbysabino", "socialnetwork": "instagram"}, {"url": "http://distilleryimage10.s3.amazonaws.com/ad851714d92f11e2b5c422000a1f9a53_7.jpg", "username": "tonjuliace", "socialnetwork": "instagram"}, {"url": "http://distilleryimage6.s3.amazonaws.com/875da35cd93011e2b04622000a1f9be0_7.jpg", "username": "naataaliia96", "socialnetwork": "instagram"}, {"url": "http://distilleryimage0.s3.amazonaws.com/8f9d560cd93011e2a6de22000a1fb5b7_7.jpg", "username": "johnnyrocks320", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/28122230d92e11e2879222000ae9142f_7.jpg", "username": "julespires", "socialnetwork": "instagram"}, {"url": "http://distilleryimage6.s3.amazonaws.com/5a5da17cd93011e2953322000aeb0b99_7.jpg", "username": "tato_casta", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/99e316c4d93011e280dd22000a9f3cd5_7.jpg", "username": "valecolon", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/2834e070d93011e29c1122000a1fba2c_7.jpg", "username": "adelakoci_99", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/b05a6772d93011e2aef922000a9f3c05_7.jpg", "username": "dshadows", "socialnetwork": "instagram"}, {"url": "http://pbs.twimg.com/media/BNKBIzOCUAIUQZx.jpg:large", "username": "ciintiamendes", "socialnetwork": "twitter"}, {"url": "http://distilleryimage3.s3.amazonaws.com/902fdbaed92f11e2984e22000a9d0de0_7.jpg", "username": "cameron_munro", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/d5764892d92f11e2a03a22000aaa0517_7.jpg", "username": "barb78", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/1c2ec2dcd93011e2a49722000aaa05c4_7.jpg", "username": "jacquelinevdvrie", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/0aed22cad93011e2893b22000aa8100d_7.jpg", "username": "reggaerastapete", "socialnetwork": "instagram"}, {"url": "http://distilleryimage4.s3.amazonaws.com/28bae788d93011e298dd22000a9f3c77_7.jpg", "username": "matazza87", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/d9119b6ed92f11e29d8c22000a1fbd8b_7.jpg", "username": "charlie_l_p", "socialnetwork": "instagram"}, {"url": "http://distilleryimage9.s3.amazonaws.com/fe085340d92f11e293d522000a1fab54_7.jpg", "username": "salvador3861", "socialnetwork": "instagram"}, {"url": "http://distilleryimage6.s3.amazonaws.com/d979e4aad90511e2828a22000a9f191e_7.jpg", "username": "charlooottteee_", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/5508943ed93011e2902222000a1fa52b_7.jpg", "username": "nobooboo", "socialnetwork": "instagram"}, {"url": "http://distilleryimage2.s3.amazonaws.com/2262a31cd93011e2852e22000ae90903_7.jpg", "username": "callmeprincessjasmine", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/431094f2d93011e2b55e22000a9f09fb_7.jpg", "username": "melliissakylse", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/56e0d9bad93011e2a8b922000a1f8ac2_7.jpg", "username": "sylviita", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/31408aa2d93011e28a5c22000a1f8acf_7.jpg", "username": "deborah_mwema", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/6394aaacd92f11e2844822000a1f92ea_7.jpg", "username": "victoriaegeberg", "socialnetwork": "instagram"}, {"url": "http://distilleryimage10.s3.amazonaws.com/80765fa4544511e2b4f022000a1f9ac6_7.jpg", "username": "lola996", "socialnetwork": "instagram"}, {"url": "http://distilleryimage6.s3.amazonaws.com/df2169a4d92e11e2bc9d22000a1fbcb9_7.jpg", "username": "aldiany", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/93d86df2d92f11e29a9c22000a1fbe09_7.jpg", "username": "felipegs27", "socialnetwork": "instagram"}, {"url": "http://distilleryimage4.s3.amazonaws.com/626a10fed92f11e28b8022000aaa0a1f_7.jpg", "username": "calebgdb", "socialnetwork": "instagram"}, {"url": "http://distilleryimage0.s3.amazonaws.com/bd7f312cd92f11e2a2e222000a9e48a3_7.jpg", "username": "brvince", "socialnetwork": "instagram"}];
var canFilteredImages = [{"url": "http://distilleryimage3.s3.amazonaws.com/6bb8afe2d93111e293c522000a9f4d92_7.jpg", "username": "neutralize_91", "socialnetwork": "instagram"}, {"url": "http://distilleryimage9.s3.amazonaws.com/58758e7ed93011e284fa22000a1f9c87_7.jpg", "username": "mirna_estrada", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/6bb8afe2d93111e293c522000a9f4d92_7.jpg", "username": "neutralize_91", "socialnetwork": "instagram"}, {"url": "http://distilleryimage9.s3.amazonaws.com/58758e7ed93011e284fa22000a1f9c87_7.jpg", "username": "mirna_estrada", "socialnetwork": "instagram"}, {"url": "http://distilleryimage6.s3.amazonaws.com/37edc74ad92e11e2ac5222000a1fbd4b_7.jpg", "username": "willian_bressan", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/3e71c70cd92d11e2800922000a9e5110_7.jpg", "username": "hermanthaa", "socialnetwork": "instagram"}, {"url": "http://distilleryimage0.s3.amazonaws.com/ac1c1498d92c11e2bfa222000ae904e2_7.jpg", "username": "igornf15", "socialnetwork": "instagram"}, {"url": "http://distilleryimage2.s3.amazonaws.com/9a9eafc0d92a11e2ab3c22000a1fc513_7.jpg", "username": "tannytoo", "socialnetwork": "instagram"}, {"url": "http://distilleryimage11.s3.amazonaws.com/349b2752d92b11e28fe822000a9e17dc_7.jpg", "username": "laurabautista06", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/8007f8ced92a11e2bf5322000a9f38c3_7.jpg", "username": "bennett_moore", "socialnetwork": "instagram"}, {"url": "http://distilleryimage6.s3.amazonaws.com/e790a5c4d92811e28f8522000ae80193_7.jpg", "username": "peeweefoo", "socialnetwork": "instagram"}, {"url": "http://distilleryimage11.s3.amazonaws.com/65c5f482d92711e2b3f322000a1f96e5_7.jpg", "username": "reach4dastarz", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/1c170f2ad92611e2978222000aa80103_7.jpg", "username": "klaudiaitgirl", "socialnetwork": "instagram"}];
var logoFilteredImages = [{"url": "http://distilleryimage7.s3.amazonaws.com/46d56c0ad93211e2990022000aeb0f0c_7.jpg", "username": "kap_u_moru", "socialnetwork": "instagram"}, {"url": "http://distilleryimage9.s3.amazonaws.com/7dd0de1ad93211e2bccc22000a1f8cda_7.jpg", "username": "ivan_tato", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/e893b9f4d93011e2abd122000ae907cd_7.jpg", "username": "rafaelamarcon", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/87dbc268d93111e289b122000a9f18c4_7.jpg", "username": "nobooboo", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/07b11338d82b11e297bf22000a1f9263_7.jpg", "username": "kjarlajn", "socialnetwork": "instagram"}, {"url": "http://distilleryimage0.s3.amazonaws.com/bd7f312cd92f11e2a2e222000a9e48a3_7.jpg", "username": "brvince", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/46d56c0ad93211e2990022000aeb0f0c_7.jpg", "username": "kap_u_moru", "socialnetwork": "instagram"}, {"url": "http://distilleryimage9.s3.amazonaws.com/7dd0de1ad93211e2bccc22000a1f8cda_7.jpg", "username": "ivan_tato", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/e893b9f4d93011e2abd122000ae907cd_7.jpg", "username": "rafaelamarcon", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/87dbc268d93111e289b122000a9f18c4_7.jpg", "username": "nobooboo", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/07b11338d82b11e297bf22000a1f9263_7.jpg", "username": "kjarlajn", "socialnetwork": "instagram"}, {"url": "http://distilleryimage0.s3.amazonaws.com/bd7f312cd92f11e2a2e222000a9e48a3_7.jpg", "username": "brvince", "socialnetwork": "instagram"}, {"url": "http://distilleryimage2.s3.amazonaws.com/a8a2fc16d92f11e2a2e022000a1faf45_7.jpg", "username": "martibaiardo", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/e725bf6ed92f11e2b93122000a1f8c8d_7.jpg", "username": "ptite_chose", "socialnetwork": "instagram"}, {"url": "http://distilleryimage2.s3.amazonaws.com/92caad72d92e11e2a49722000aaa05c4_7.jpg", "username": "vi0lyn", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/1e82210cd92911e2895a22000a1fc66c_7.jpg", "username": "lu_ciiana", "socialnetwork": "instagram"}, {"url": "http://distilleryimage10.s3.amazonaws.com/6a2687d8d92e11e28fba22000a1fb1a7_7.jpg", "username": "dylanworrall96", "socialnetwork": "instagram"}, {"url": "http://distilleryimage10.s3.amazonaws.com/4d47e270d92d11e2b56022000a9f1354_7.jpg", "username": "giadatoniato", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/15283782d92d11e280f522000a9e17fb_7.jpg", "username": "frejaslivelove", "socialnetwork": "instagram"}, {"url": "http://distilleryimage10.s3.amazonaws.com/a66a2d82d92c11e2bc6c22000a9f38d4_7.jpg", "username": "emilygregory12345", "socialnetwork": "instagram"}, {"url": "http://distilleryimage2.s3.amazonaws.com/2489b45ed92c11e2867a22000a9f1266_7.jpg", "username": "itsnancybitch", "socialnetwork": "instagram"}, {"url": "http://distilleryimage9.s3.amazonaws.com/d753af50d92b11e282b622000ae912ed_7.jpg", "username": "jessicabailey123", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/ae9312b4d92a11e2bdcf22000a1fbe62_7.jpg", "username": "james_r_b_l_d_n_h_davis", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/43be0f10d92b11e2b45222000a1f97b0_7.jpg", "username": "flmorton", "socialnetwork": "instagram"}, {"url": "http://distilleryimage1.s3.amazonaws.com/9f5722d6d92a11e2be0322000a9f38f1_7.jpg", "username": "s3idan", "socialnetwork": "instagram"}, {"url": "http://distilleryimage4.s3.amazonaws.com/d65f139cd92a11e2af5922000aeb0fcc_7.jpg", "username": "stefan_v_tomash", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/2ed8b214d92911e2978e22000a1fb9d3_7.jpg", "username": "archivez", "socialnetwork": "instagram"}, {"url": "http://distilleryimage3.s3.amazonaws.com/140609c4d92811e29de622000ae90e7b_7.jpg", "username": "liammainka1", "socialnetwork": "instagram"}, {"url": "http://distilleryimage7.s3.amazonaws.com/1b8ed3d4d92711e2988322000a1ddbb4_7.jpg", "username": "_ser3na_", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/50f9b732d92711e29ae122000a1f9a03_7.jpg", "username": "koron1", "socialnetwork": "instagram"}, {"url": "http://pbs.twimg.com/media/BNJvsxACQAASCG2.jpg:large", "username": "lauracastejon2", "socialnetwork": "twitter"}, {"url": "http://distilleryimage3.s3.amazonaws.com/a728476ed92611e2a55d22000a1fbcd5_7.jpg", "username": "scrulove", "socialnetwork": "instagram"}, {"url": "http://distilleryimage11.s3.amazonaws.com/b3f6ecdad92511e2bdf822000a1fa51c_7.jpg", "username": "lovely_fede", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/b9f426ded92511e29cc922000aaa090c_7.jpg", "username": "xoxomaryy", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/a512dcbad92511e2a54022000ae911f0_7.jpg", "username": "leododaj", "socialnetwork": "instagram"}, {"url": "http://distilleryimage2.s3.amazonaws.com/ece872aed92311e2acc922000ae81df1_7.jpg", "username": "jamiepreston", "socialnetwork": "instagram"}, {"url": "http://distilleryimage8.s3.amazonaws.com/68a585e0d92311e2b7ab22000a1f90e7_7.jpg", "username": "turnipz", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/b9f426ded92511e29cc922000aaa090c_7.jpg", "username": "xoxomaryy", "socialnetwork": "instagram"}, {"url": "http://distilleryimage5.s3.amazonaws.com/a512dcbad92511e2a54022000ae911f0_7.jpg", "username": "leododaj", "socialnetwork": "instagram"}, {"url": "http://distilleryimage2.s3.amazonaws.com/ece872aed92311e2acc922000ae81df1_7.jpg", "username": "jamiepreston", "socialnetwork": "instagram"}];

renderHoneycomb(allImages);

addToHoneyComb(canFilteredImages, 'can filter');

addToHoneyComb(logoFilteredImages, 'logo filter');