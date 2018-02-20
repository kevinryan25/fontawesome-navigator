const wi = require('./wi.js');
const fs = require('fs');

module.exports = (grunt) => {


    grunt.registerTask('build', () => {
        wi.mkNewDir('dist');

        const dirs = wi.getSubDirectoriesList('src');
        const files = wi.getSubFilesList('src');

        dirs.forEach((item) => {
            if(item[0] == '.') return;
            wi.mkNewDir('dist' + item.substr(item.indexOf('/')));
        });
        wi.applyFilter(files, 
            /src\/[a-zA-Z0-9-_]/
        ).forEach((item) => {
            path = 'dist' + item.substr(item.indexOf('/'));
            fs.copyFileSync(item, path);
        })

    })

}