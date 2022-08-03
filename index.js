// var GitHub = require('github-api');

// // basic auth
// var gh = new GitHub({
//    username: 'angelcdz@gmail.com',
//    token: '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',
// });



const shell = require('shelljs');
shell.cd(__dirname);
shell.exec('git clone https://github.com/angelojea/wwl-github-poc.git deu-bonzao');
/*


let gist = gh.getGist(); // not a gist yet
gist.create({
   public: true,
   description: 'My first gist',
   files: {
      "file1.txt": {
         content: "Aren't gists great!"
      }
   }
}).then(function({data}) {
   // Promises!
   let createdGist = data;
   return gist.read();
}).then(function({data}) {
   let retrievedGist = data;
   // do interesting things
});

*/