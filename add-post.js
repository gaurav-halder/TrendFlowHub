document.addEventListener('DOMContentLoaded', function() {

    const postForm = document.getElementById('postForm');

    postForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent the default form submission
        
        const formData = new FormData(postForm);
        const postData = Object.fromEntries(formData);
        postData.likeCount = parseInt(postData.likeCount, 10); // Ensure numeric fields are sent as numbers
        postData.commentCount = parseInt(postData.commentCount, 10);
        postData.shareCount = parseInt(postData.shareCount, 10);

        try {
            const response = await fetch('https://basicsocialmedia-gkhs.onrender.com/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            if (response.ok) {
                displayMessage('Post submitted successfully!');
               postForm.reset();
            } else {
                throw new Error('Post submission failed');
            }
        } catch (error) {
            displayMessage(error.message, false);
        }
    });


    async function displayMessage(message, isSuccess = true) {
        const messageElement = document.getElementById('message');
        //console.log(messageElement);
        messageElement.textContent = message;
        messageElement.style.color = isSuccess ? 'green' : 'red'; // Green for success, red for errors
        messageElement.style.display = 'block'; // Show the message
    }
 
});
