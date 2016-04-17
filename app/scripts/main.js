document.addEventListener('DOMContentLoaded', function(event) {

  var toggle = document.querySelectorAll('.toggle-nav');
  var menu = document.querySelector('.nav');
  [].forEach.call(toggle,function(elem) {
    elem.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('hello');
      menu.classList.toggle('nav--open');
    });
  });
});
