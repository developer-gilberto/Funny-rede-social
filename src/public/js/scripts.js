console.log("FUNNY: Hello world!");

const inputFilePub = document.querySelector('#input_file_pub');
const nameImgPub = document.querySelector('#name_img_pub');

inputFilePub.addEventListener('change', () => {
    nameImgPub.textContent = inputFilePub.value;
});