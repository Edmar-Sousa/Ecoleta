const ButtonSearch = document.querySelector('#home-page main a');

const ButtonClose = document.querySelector('#modal a');

const Modal = document.querySelector('#modal');

ButtonSearch.addEventListener('click', function(){
    Modal.classList.remove('hide');
});

ButtonClose.addEventListener('click', function(){
    Modal.classList.add('hide')
});
