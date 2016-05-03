import $ from 'jquery';

//GRABBING ELEMENTS FROM HTML TO DISPLAY DATA IN
var ul = $('.companies');
var test_ul = $('.t_u');
var about = $('.product-info');
var btn = $('button');

//CREATING URL FROM API'S
var compUrl = 'https://json-data.herokuapp.com/darts/companies';
var testimonial_url ='https://json-data.herokuapp.com/darts/testimonials';
var product_url ='https://json-data.herokuapp.com/darts/info';
var users='';

btn.on('click',function(event){
  event.preventDefault();
  alert('100 DARTS ADDED TO YOUR CART ...THANK YOU');
})

//GETTING JSON FROM TESTIMONIALS API
$.getJSON(testimonial_url).then(function(res){
  //console.log(res.results);
  res.results.forEach(function(obj){
    var pageData = testimonials_data(obj);
    test_ul.append(pageData);
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
  //console.log(res.results);
  res.results.forEach(function(obj){
    // console.log(obj.image_url);
    var pageData = compImage(obj);
    ul.append(pageData);
  })
});

function testimonials_data(obj){
  return `
    <li class="test_li">
      <div class="photo">
        <img src=' '/>
        <div class="testimonial_text">
          <h4>${obj.name}</h4>
          <p>${obj.review}</p>
        </div>
      </div>
    </li>
  `;
};

function compImage(obj){
  return `
  <li>
    <img src=${obj.image_url} />
  </li>
  `;
}