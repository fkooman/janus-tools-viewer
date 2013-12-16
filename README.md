# Introduction
This is a viewer for [janus-tools](https://github.com/fkooman/janus-tools). It
can currently parse `log.json`.

# Installation
In order to install the required dependencies you need to run 
[Bower](http://bower.io/). 

    $ bower install

This will install jQuery, Twitter Bootstrap and Handlebars.

### Steps to make a non systemwide bower install 
Follow these steps when bower is not installed and you do not have root access on the system.

- Download and extract node.js from: http://nodejs.org/download/
- Add the bin directory from the extracted node.js to your PATH-environment-variable
- Change directory to the bin directory from the extracted node.js
- type: npm install -g bower

From this point the bower-command can be used.


# Configuration
Copy the `config/config.js.default` to `config/config.js` and modify the URL 
according to your setup to create direct links to the originating JANUS entry.

Make sure you place the `log.json` in the same directory as the `index.html` 
file and view the URL in your browser.
