console.log("FUNNY, Hello world!");

window.document.addEventListener('scroll', () => {
    if (scrollY >= 900) {
        document.querySelector('.btn_go_top').style.display = 'block';
    } else {
        document.querySelector('.btn_go_top').style.display = 'none';
    }
});

// function showValueInputFilePub() {
//     document.querySelector('#name_img_pub').textContent = document.querySelector('#input_file_pub').value;
// }
function showValueInputFilePub() {
    var inputFile = document.querySelector('#input_file_pub');
    var fileName = inputFile.files[0] ? inputFile.files[0].name : '';
    document.querySelector('#name_img_pub').textContent = fileName;
}

function showValueInputFileProfilePic() {
    document.querySelector('#name_profilePic_profile').textContent = document.querySelector('#input_profile_pic').value;
}

function showMenu() {
    document.querySelector('#menu_config_profile').classList.toggle('showMenu');
}

function showNotifications() {
    document.querySelector('.list_notifications').classList.toggle('showNotifications');
}

function noFriendRequests() {
    document.querySelector('#noFriendRequests').classList.toggle('showNoFriendRequests');
}

const itensMenu = document.querySelectorAll('.items_menu_profile');
itensMenu.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('#menu_config_profile').classList.toggle('showMenu');
    });
});

function showFormEditProfile() {
    document.querySelector('#name_profilePic_profile').textContent = '';
    document.querySelector('#form_profilePic').classList.toggle('showFormEditProfile');
}

function goTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}