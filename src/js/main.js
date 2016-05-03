import $ from 'jquery';
var ul = $('ul');
var compUrl = 'https://json-data.herokuapp.com/darts/companies';

$.getJSON(compUrl).then(function(res){
  //console.log(res.results);
  res.results.forEach(function(obj){
    // console.log(obj.image_url);
    var pageData = compImage(obj);
    ul.append(pageData);
  })
});


function compImage(obj){
  return `
  <li>
    <img src=${obj.image_url} />
  </li>
  `;
}