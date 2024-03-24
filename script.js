document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const keywordInput = document.getElementById('keyword');
    const userList = document.querySelector('.user-list');
    const filterBy = document.getElementById('filterBy');
    const sortBy = document.getElementById('sortBy');

    searchBtn.addEventListener('click', async function() {
        const keyword = keywordInput.value;
        const platform = filterBy.value;
        if (!keyword) {
            alert("Please enter a keyword to search.");
            return;
        }
        
        // Clear previous results
        userList.innerHTML = '<ul>Loading...</ul>';

        try {
            // Fetch tweets (currently client side but should be server side)
            const posts = await fetchPostsByKeyword(keyword,platform);
            
          // Clear the current posts
        userList.innerHTML = '';

        // Check if posts are found
        if(posts.length === 0) {
            userList.innerHTML = '<li>No posts found.</li>';
            return;
        }

        // Iterate over each post and add it to the UI
        posts.forEach(post => {
            const li = document.createElement('li');
            li.innerHTML = `
                
                <h3><strong>Text:</strong> ${post.text}</p>
                <h4><strong>Platform:</strong> ${post.platform}</p>
                <p><strong>Author:</strong> ${post.author}</p>
                <div class="post-meta">
                <p><strong>Likes:</strong> ${post.likeCount}, <strong>Comments:</strong> ${post.commentCount}</p>
                </div>
                <p><strong>Date:</strong> ${new Date(post.timestamp).toLocaleDateString()}</p>
                <a href="${post.mediaUrl}" target="_blank">View Post</a>
            `; // Adjust according to your post object structure
            userList.appendChild(li);
        });
        } catch (error) {
            userList.innerHTML = '<ul>Error loading data. Please try again.</ul>';
            console.error(error);
        }
    });


    async function fetchPostsByKeyword(keyword,platform) {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/search?query=${keyword}&platform=${platform}&sortBy=${sortBy.value}`);
            const posts = await response.json();

            console.log(posts);
            
            return posts;
            
        } catch (error) {
            console.error('sddError fetching tweets:', error);
        }
    }

    // Filtering and sorting logic
    filterBy.addEventListener('change', function() {
        // Add filtering logic here
    });

    sortBy.addEventListener('change', function() {
        // Add sorting logic here

    });

    // Continue with logic for Facebook and Instagram if needed
});
