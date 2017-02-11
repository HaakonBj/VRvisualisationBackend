var git = require('nodegit');

const localPath: string = require("path").join(__dirname, "../localRepo");

//get the repo or clone it.
let initRepo: (gitUrl: string) => void =
  function (gitUrl: string): void {
    git.Repository.open(localPath)
      .then(function (repo) {
        saveTest(repo);
      }).catch(function (e) {
        console.log("Error: " + e);
        console.log("Cloning repo instead");
        git.Clone.clone(gitUrl, localPath)
          .then(function (repo) {
            saveTest(repo);
          }).catch(function (e) {
            console.log("Error cloning repo: " + e);
          })
      });
  }

let saveTest: (repo: any) => void =
  function (repo: any): void {
    repo.getHeadCommit().then(function (commit) {
      var eventEmitter = commit.history();

      //Handle commit
      eventEmitter.on('commit', function (commit) {
        console.log(commit.sha() + "\n");
      });

      //Finished
      eventEmitter.on('end', function (commits) {
        console.log("end event fired \n");
      });

      //Error
      eventEmitter.on('error', function (error) {
        console.log("eventEmitter failed");
        return false;
      });

      eventEmitter.start();
    });
  }

export { initRepo };
