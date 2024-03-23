const Twitter = require('twitter-lite');

const client = new Twitter({
    subdomain: 'api', // "api" is the default (change for other subdomains)
    version: '1.1', // version "1.1" is the default (change for other subdomains)
    consumer_key: '8FAdCtGzWxM52D2pMHanr5PX7', // API Key
    consumer_secret: 'n9POcrg8Wp7pSgLrOBBh8JRDEDjyPPRM4vLgcOZO0kboc0AuQ1', // API Key Secret
    access_token_key: '1705655220917633024-MgAYkP419hhBYDN5yRNcdG1jeN1LfQ', // Access Token
    access_token_secret: 'fthQxn3qOKMNqWTLioxMJSTY9rarrMYFMWtPGsxrdUydi', // Access Token Secret
});


// Function to fetch tweets based on keyword
async function fetchTweetsByKeyword(keyword) {
  try {
      const tweets = await client.get('search/tweets', { q: keyword });
      return tweets;
  } catch (error) {
      console.error('Error fetching tweets:', error);
      throw error;
  }
}

// Example usage
const keyword = 'nodejs'; // Specify the keyword or hashtag you want to search for
fetchTweetsByKeyword(keyword)
  .then((tweets) => {
      // Process and handle tweets
      console.log(tweets);
  })
  .catch((error) => {
      // Handle error
      console.error(error);
  });