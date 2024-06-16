console.log("FUNNY, Hello world!");

window.document.addEventListener('scroll', () => {
    if (scrollY >= 900) {
        document.querySelector('.btn_go_top').style.display = 'block';
    } else {
        document.querySelector('.btn_go_top').style.display = 'none';
    }
});

function showValueInputFilePub() {
    document.querySelector('#name_img_pub').textContent = document.querySelector('#input_file_pub').value;
}

function showValueInputFileProfilePic() {
    document.querySelector('#name_profilePic_profile').textContent = document.querySelector('#input_profile_pic').value;
}

function showMenu() {
    document.querySelector('#menu_config_profile').classList.toggle('showMenu');
}

function goTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}