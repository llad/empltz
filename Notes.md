Templay Notes
=============
---

Links
=====
	* Production[templay.no.de]

Git
===

for new directory: git init
git remote add joyent node@templay.no.de:repo

	1. git add .
	2. git commit -m "fix basic errors from jshint"
	3. git push joyent master
	4. git push -u origin master (github)
	
no.de
=====

ssh
---
ssh node@templay.no.de

start manually
--------------
If service won't work, just start manually:
/home/node/local/nodejs/bin/node /home/node/node-service/current/server.js

Starting Mongo
------------------
export LD_LIBRARY_PATH=mongo-extra-64
/home/node/mongodb-sunos5-x86_64-1.8.0/bin/mongod --dbpath ~/mongo
./bin/mongod --dbpath ~/mongo --fork --logpath ~/mongodb.log --logappend




Mongo
=====

brew install mongodb
npm install mongodb

If this is your first install, automatically load on login with:
    mkdir -p ~/Library/LaunchAgents
    cp /usr/local/Cellar/mongodb/1.6.5-x86_64/org.mongodb.mongod.plist ~/Library/LaunchAgents/
    launchctl load -w ~/Library/LaunchAgents/org.mongodb.mongod.plist

If this is an upgrade and you already have the org.mongodb.mongod.plist loaded:
    launchctl unload -w ~/Library/LaunchAgents/org.mongodb.mongod.plist
    cp /usr/local/Cellar/mongodb/1.6.5-x86_64/org.mongodb.mongod.plist ~/Library/LaunchAgents/
    launchctl load -w ~/Library/LaunchAgents/org.mongodb.mongod.plist

Or start it manually:
    mongod run --config /usr/local/Cellar/mongodb/1.6.5-x86_64/mongod.conf



