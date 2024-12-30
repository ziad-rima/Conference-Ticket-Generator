const form = document.getElementById("userForm");
const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");

const removeBtn = document.getElementById("removeBtn");
const changeBtn = document.getElementById("changeBtn");

const preview = document.getElementById("preview");
const uploadText = document.getElementById("uploadText");

const textInputs = document.querySelectorAll(".required");


const formData = {
    image: '',
    name: '',
    email: '',
    githubUsername: ''
}

const validateFileType = () => {
    const file = fileInput.files[0];
    if (!file) return false;
    
    const fileSizeLimit = 500 * 1024;
    const validTypes = ['image/jpeg', 'image/png'];
    let isValid = true;

    if(file.size > fileSizeLimit) {
        alert("File size exceeds 500KB.");
        fileInput.value = "";
        isValid = false;
    } else if (!validTypes.includes(file.type)) {
        alert("File type not supported. Upload a png or jpeg");
        fileInput.value = "";
        isValid = false;
    }
    return isValid;
}

const validateTextInputs = () => {
    let isValid = true;

    textInputs.forEach((input) => {
        if (input.value.trim() === "") {
            alert("Invalid or empty input");
            isValid = false;
        } else {
            isValid = true;
        }
    })
    return isValid
}

uploadArea.addEventListener("click", () => {
    fileInput.click();
})

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
})

uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
})

uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];

    if (file) {
    handleFile(file);
    }
})

fileInput.addEventListener('change', (e) => {
    e.preventDefault();
    fileInput.setAttribute('required', true);
    const file = e.target.files[0];
    if (file) {
    handleFile(file);
    }
})

const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);

    removeBtn.style.display = "inline-block";
    changeBtn.style.display = "inline-block";
    uploadText.style.display = "none";
}

changeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInput.click();
})

removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    preview.src = "";
    preview.style.display = "none";
    fileInput.value = "";
    removeBtn.style.display = "none";
    changeBtn.style.display = "none";
    uploadText.style.display = "block";
})

const storeAndDisplayFormData = () => {
    formData.image = preview.src;
    formData.name = document.getElementById('name').value.trim();
    formData.email = document.getElementById('email').value.trim();
    formData.githubUsername = document.getElementById('username').value.trim();

    document.getElementById('header-name').textContent = formData.name;
    document.getElementById('display-email').textContent = formData.email;
    document.getElementById('display-image').src = formData.image;
    document.getElementById('display-name').textContent = formData.name;
    document.getElementById('display-github').textContent = formData.githubUsername;
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const isInputValid = validateTextInputs();
    const isFileValid = validateFileType();

    if (isInputValid && isFileValid) {
        storeAndDisplayFormData();
        document.getElementById('header').classList.add("hide");
        document.getElementById('hero').classList.add("hide");
        document.getElementById('userForm').classList.add("hide");
        document.getElementById('display-data').style.display = 'block';
    }
})

