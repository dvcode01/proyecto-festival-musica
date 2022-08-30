
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp(){
    navFixed();
    createGallery();
    scrollNav();
}

function createGallery(){
    const gallery = document.querySelector('.gallery-images');

    for (let i = 1; i <= 12; i++) {
        const image = document.createElement('picture');
        image.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        image.onclick = function(){
            showImages(i);
        }
        
        gallery.appendChild(image);
    }

}

function showImages(id){
    const image = document.createElement('picture');
        image.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
        `;

    // Overlay con la imagen
    const overlay = document.createElement('div');
    overlay.appendChild(image);
    overlay.classList.add('overlay');

    // añadiendo boton al overlay
    const button = document.createElement('button');
    button.textContent = 'X';
    button.classList.add('btn-close');
    button.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(button);

    // Agregando el overlay al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}

function scrollNav(){
    const links = document.querySelectorAll('.navegacion a');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({ behavior: 'smooth'});
        });
    })
}

function navFixed(){
    const headerNav = document.querySelector('.header');
    const aboutFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', () => {

        if(aboutFestival.getBoundingClientRect().bottom < 0){
            headerNav.classList.add('fixed');
            body.classList.add('body-scroll');
        }else{
            headerNav.classList.remove('fixed');
            body.classList.remove('body-scroll');
        }
    })
}