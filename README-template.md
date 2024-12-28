# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

-For this project, I decided to start coding considering large screen sizes then I used media queries for smaller screen sizes.

This time, I structred my html document in a better way so I did not face any difficulties in terms of design and layout, especially when targeting small devices, that was relatively easy compared to previous projects.
Anyway, at the moment of typing this, I finished the form page, made it responsive, and functional. However, for some reason, my JavaScript handles the drag and drop, in addition to remove and change buttons in a weird way, but since this is my first time writing JavaScript in what seems to be a real-world scenario, I don't really have a problem with it, as long as it works correctly.

  - I started structuring my html this way: 
  ```html
    <main>
      <header>
        <div class="header-container">
          ...
        </div>     
      </header>
      <div class="hero">
        <div class="hero-container">
          ...
        </div>
      </div>

      <form action="" method="post">
      ...
      </form>

      <script>
        ...
      </script>
    </main>
  ```
  - I did the usual with the stylesheet, set the css variables and removed the default margins and paddings:
  ```css
    *, 
    *::after,
    *::before {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --Neutral-0: hsl(0, 0%, 100%);
      --Neutral-300: hsl(252, 6%, 83%);
      --Neutral-500: hsl(245, 15%, 58%);
      --Neutral-700: hsl(245, 19%, 35%);
      --Neutral-900: hsl(248, 70%, 10%);
      --Orange-500: hsl(7, 88%, 67%);
      --Orange-700: hsl(7, 71%, 60%);
      --Gradient: hsl(7, 86%, 67%), hsl(0, 0%, 100%);
      --font-bold: 'FontBold';
      --font-extraBold: 'FontExtraBold';
      --font-medium: 'FontMedium';
      --font-regular: 'FontRegular';
    }
  ```
As for the script, for now, it handles the upload area, where I set the display of the input button to none and made the div `<div class="upload-area sm-text" id="uploadArea">` functional (users can drag and drop or click on this area to upload a photo). Here's the script:
- I first targeted the upload area and the input button (id of `fileInput`): 
```js
    const uploadArea = document.getElementById("uploadArea");
    const fileInput = document.getElementbyId("fileInput");
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
    })
```
- You can see that I added a class named `dragover` which styles the upload area whenever the user drags a file to it, and once it is dropped, the `dragover` class is removed and then the photo is stored in a variable named file, `const file = e.dataTransfer.files[0]` where `e` is the event object returned by the browser that basically holds information (or data) about the action performed (hence the event), typically by the user, such as the `dataTransfer` object which has an array property `files` which as far as I know stores the files uploaded by the user, as you can see, I'm accessing the file at index 0, which is the uploaded photo.
```js
  if (file) {
    handleFile(file);
  }
```
`handleFile()` is a function that performs the reading and uploading of the file: 
```js
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
```
I then decided to create a separate JavaScript file and move the script code to that file.

I thought I should handle the congrats page separately as well, but as the code became messy, I stepped back and included the second page within the main index.html file.


### Built with

- Semantic HTML5 markup
- CSS custom properties
- JavaScript
- Flexbox

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

I learned about `FileReader()` API in JavaScript, which is a built-in object used to read the content of files in different formats (text, data URLs, or binary data), and to process the file data before displaying or uploading it. 
I learned three of its properties:
  1- `FileReader.result`: contains the result of the file read operation, and its type depends on the method used (`readAsText`, `readAsDataURL`, etc.)
  2- `FileReader.readyState`: represents the state of the reader.
                                - `0` (EMPTY): No data loaded yet.
                                - `1` (LOADING): Data is currently being read.
                                - `2` (DONE): Reading operation completed. 
  3- `FileReader.error`: contains any error that occured during the read operation.

Along with three other methods:
  1- `readAsText(file)`: reads the file as plain text, reading `.txt` files for example.
  2- `readAsDataURL(file)`: reads the file as a base64-encoded string (used for embedding images or other media directly in HTML). And this is the method I used to read the uploaded photo.
  3- `abort()`: cancels the current read operation.

And some events:
  1- `onload`: triggered when the read operation successfully completes.
  2- `onerror`: triggered if an error occured during the read operation.
  3- `onprogress`: triggered periodically while the read operation is in progress (useful for showing a loading bar).
  4- `onabort`: triggered when the `abort()` method is called.

Real-Life Applications: 
  1- **Image Previews**: allow users to see the image they're uploading before submission.
  2- **File Validation**: Read and check the file's content.
  3- **Drag-and-Drop File Upload**: Process files uploaded via drag-and-drop.
  


To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```js
const proudOfThisFunc = () => {
  console.log('🎉')
}
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
