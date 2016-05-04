import $ from 'jquery';

//GRABBING ELEMENTS FROM HTML TO DISPLAY DATA
var ul = $('.companies');
var test_ul = $('.t_u');
var about = $('.product-info');
var btn = $('button');



// CAROUSEL MOVE
function moveImages(){
var first   = $('.first');
var last    = $('.last');
var current = $('.active');
var next = current.next();

if(current.hasClass('last')){
  first.addClass('active');
  last.removeClass('active');
}else{
  current.removeClass('active');
  next.addClass('active');
}

};
setInterval(moveImages, 3000);

//CREATING URL FROM API'S
var compUrl = 'https://json-data.herokuapp.com/darts/companies';
var testimonial_url ='https://json-data.herokuapp.com/darts/testimonials';
var product_url ='https://json-data.herokuapp.com/darts/info';
var user_url = 'http://api.randomuser.me/?results=';

btn.on('click',function(event){
  event.preventDefault();
  alert('100 DARTS ADDED TO YOUR CART ...THANK YOU');
})

//GETTING JSON FROM TESTIMONIALS API
$.getJSON(testimonial_url).then(function(res){
  var testimonials= res.results;

  $.getJSON(user_url + testimonials.length).then(function(user){
    console.log(user);
    var user_data= user.results;
    var final_test = [];

    for(var i=0; i<testimonials.length; i++){
      final_test.push({
        user    : user_data[i].picture.large,
        name    : testimonials[i].name,
        review  : testimonials[i].review
      });
      console.log('final_test',final_test);
    } 
      final_test.forEach(function(x){
          var pageData = `
          <li class="test_li">
          <div class="photo">
         <img src='${x.user}'/>
        <div class="testimonial_text">
          <h4>${x.name}</h4>
          <p>${x.review}</p>
        </div>
      </div>
    </li>`;
    test_ul.append(pageData);

      });
  });
});

//PRODUCT INFO FROM PRODUCT API

$.getJSON(product_url).then(function(res){
  //console.log(res.data.product.description);
  var pageData=`
    <h4>${res.data.product.title}</h4>
    <p>${res.data.product.description}</p>

  `;
  about.append(pageData);
});


//GETTING JSON FROM USERS API

//included in the testimonial api



//GETTING JSON FROM COMPANY'S API
$.getJSON(compUrl).then(function(res){
  res.results.forEach(function(obj){
    var pageData = compImage(obj);
    ul.append(pageData);
  })
});

// function testimonials_data(obj){
//   return `
//     <li class="test_li">
//       <div class="photo">
//         <img src=' '/>
//         <div class="testimonial_text">
//           <h4>${obj.name}</h4>
//           <p>${obj.review}</p>
//         </div>
//       </div>
//     </li>
//   `;
// };

function compImage(obj){
  return `
  <li>
    <img src=${obj.image_url} />
  </li>
  `;
}

