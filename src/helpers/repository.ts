var git = require('nodegit');
var mongoose = require('mongoose');
var gitHistory = require('../models/GitHistoryModel');
const localPath: string = require("path").join(__dirname, "../localRepo");

//get the repo or clone it.
let initRepo: (gitUrl: string) => void =
  function (gitUrl: string): void {
    git.Repository.open(localPath)
      .then(function (repo) {
        saveAllCommitsData(repo);
      }).catch(function (e) {
        console.log("Error: " + e);
        console.log("Cloning repo instead");
        git.Clone.clone(gitUrl, localPath)
          .then(function (repo) {
            saveAllCommitsData(repo);
          }).catch(function (e) {
            console.log("Error cloning repo: " + e);
          })
      });
  }
//TODO: change sha from being key
//TODO: figure out the order the commits are added
let saveAllCommitsData: (repo: any) => void =
  function (repo: any): void {
    repo.getHeadCommit().then(function (commit) {
      var eventEmitter = commit.history();

      //Handle commit
      eventEmitter.on('commit', function (commit) {
        let parents: string[] = commit.parents();
        let commitToBeAdded = new gitHistory({
          sha: commit.sha(),
          author: commit.author(),
          commitDate: commit.date()
        });
        //Add all the parents sha:
        for (let parent of parents) {
          commitToBeAdded.parents.push({ sha: parent });
        }
        //Save the data in the db
        commitToBeAdded.save(function(e){
          if(e){
            console.log("Something went wrong when saving to the db: " + e);
          }
        });
      });

      //Finished
      eventEmitter.on('end', function (commits) {
        //console.log("end event fired \n");
      });

      //Error
      eventEmitter.on('error', function (error) {
        console.log("eventEmitter failed" + error);
      });

      eventEmitter.start();
    });
  }

export { initRepo };
