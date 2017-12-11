const path = require('path');

module.exports = {
	src   : path.join(__dirname, '../source') ,
	build : path.join(__dirname, '../dist/'),
    pages : {
        template : path.join(__dirname, '../source/template/'),
        index    : path.join(__dirname, '../source/pages/index/'),
        blog     : path.join(__dirname, '../source/pages/blog/'),
        about    : path.join(__dirname, '../source/pages/about/'),
        works    : path.join(__dirname, '../source/pages/works/')
    }
};
