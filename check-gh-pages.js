const https = require('https');

// Replace with your GitHub username and repository name
const owner = 'Mahesh1507';
const repo = 'Portfolio';

const options = {
  hostname: 'api.github.com',
  path: `/repos/${owner}/${repo}/pages`,
  method: 'GET',
  headers: {
    'User-Agent': 'Node.js'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const pagesInfo = JSON.parse(data);
      console.log('GitHub Pages is enabled!');
      console.log(`Status: ${pagesInfo.status}`);
      console.log(`URL: ${pagesInfo.html_url}`);
      console.log(`Source: ${pagesInfo.source.branch}/${pagesInfo.source.path}`);
    } else if (res.statusCode === 404) {
      console.log('GitHub Pages is not enabled for this repository.');
      console.log('Please enable it in the repository settings:');
      console.log(`https://github.com/${owner}/${repo}/settings/pages`);
    } else {
      console.log(`Error: ${res.statusCode}`);
      console.log(data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end(); 