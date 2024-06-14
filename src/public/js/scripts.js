console.log("FUNNY > Hello world!");

document.querySelector('#input_file_pub').addEventListener('change', () => {
    document.querySelector('#name_img_pub').textContent = document.querySelector('#input_file_pub').value;
});

document.querySelector('#icon_config_profile').addEventListener('click', () => {
    console.log('clicou');
    document.querySelector('#menu_config_profile').classList.toggle('showMenu');
});

window.document.addEventListener('scroll', () => {
    if (scrollY >= 900) {
        document.querySelector('.btn_go_top').style.display = 'block';
    } else {
        document.querySelector('.btn_go_top').style.display = 'none';
    }
});

document.querySelector('.btn_go_top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});