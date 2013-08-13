# Introduction
This is a viewer for [janus-tools](https://github.com/fkooman/janus-tools). It
can currently parse `log.json`.

# Installation
In order to install the required dependencies you need to run 
[Bower](http://bower.io/). 

    $ bower install

This will install jQuery, Twitter Bootstrap and Handlebars.

Make sure you place the `log.json` in the same directory as the `index.html` 
file and view the URL in your browser.

# Configuration
Copy the `config/config.js.default` to `config/config.js` and modify the URL 
according to your setup to create direct links to the originating JANUS entry.
