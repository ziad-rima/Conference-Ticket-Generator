const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");

const removeBtn = document.getElementById("removeBtn");
const changeBtn = document.getElementById("changeBtn");

const preview = document.getElementById("preview");
const uploadText = document.getElementById("uploadText");

uploadArea.addEventListener("click", (e) => {
    e.preventDefault();
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
    const fileSizeLimit = 500 * 1024;

    if(file.size > fileSizeLimit) {
        alert("File size exceeds 500KB.");
        fileInput.value = "";
        return;
    }

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

removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fileInput.removeAttribute('required');
    preview.src = "";
    preview.style.display = "none";
    fileInput.value = "";
    removeBtn.style.display = "none";
    changeBtn.style.display = "none";
    uploadText.style.display = "block";
})

document.getElementById("userForm").addEventListener('submit', (e) => {
    e.preventDefault();
    const previewImage = document.getElementById("preview").value;
    const fullName = document.getElementById("name").value;
    const emailAddress = document.getElementById("email").value;
    const githubUsername = document.getElementById("username").value;

    sessionStorage.setItem('previewImage', previewImage);
    sessionStorage.setItem('fullName', fullName);
    sessionStorage.setItem('emailAddress', emailAddress);
    sessionStorage.setItem('githubUsername', githubUsername);

    window.location.href = 'ticket.html';

    const storedFullName = sessionStorage.getItem('fullName');
    const storedEmail = sessionStorage.getItem('email');
    const storedGitHubUsername = sessionStorage.getItem('githubUsername');

    document.getElementById("congratsMessage").innerHTML = `Congrats, ${storedFullName}! Your ticket is ready.`;
document.getElementById("emailedTicket").innerHTML = `We've emailed your ticket to ${storedEmail} and will send updates in the run up to the event.`

})



