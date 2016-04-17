document.addEventListener('DOMContentLoaded', function(event) {

  var toggle = document.querySelector('#toggle-nav');
  var menu = document.querySelector('.nav');
  var links = menu.querySelectorAll('a');

  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    menu.classList.toggle('nav--open');
  });
  [].forEach.call(links,function(elem) {
    elem.addEventListener('click', function(e) {
      menu.classList.toggle('nav--open');
    });
  });
});
