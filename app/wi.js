

const fs = require('fs');
const ejs = require('ejs');
const log = console.log;

/**
 * Delete a folder recursively
 * @param {String} path                 relative path to the directory to delete
 */
module.exports.recursiveDelete = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                module.exports.recursiveDelete(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}


/**
 * Execute recursively methods for each file and folder
 * @param {String} path                 relative path to the root directory
 * @param {Function} directoryCallback  callback executed for each directory
 * @param {Function} fileCallback       callback executed for each file
 */
module.exports.recursiveBuild = (path, directoryCb, fileCb) => {
    directoryCb(path);
    var subs = fs.readdirSync(path);
    subs.forEach(sub => {
        var lsub = path + "/" + sub;
        var isDir = fs.statSync(lsub).isDirectory();
        if(isDir){
            module.exports.recursiveBuild(lsub, directoryCb, fileCb);
        } else {
            fileCb(lsub);
            //fileCb(lsub);
            //log(lsub);
        }
    })
}

/**
 * Create folder copy to a new one, delete the older copy if needed
 * @param {String} source               relative path to the original
 * @param {String} destination          relative path to the copy
 */
module.exports.copyNew = (source, destination) => {

    if(fs.existsSync(destination))  module.exports.recursiveDelete(destination);
    module.exports.recursiveCopy(source, destination);

};

/**
 * Copy a folder and its children
 * @param {String} source                   relative path to the original
 * @param {String} destination              relative path to the destination
 */
module.exports.recursiveCopy = (source, destination) => {
    fs.mkdirSync(destination);
    fs.readdirSync(source).forEach((file, index) => {
        if(file[0] == ".") return;
        var path = source+"/"+file;
        var ldest = destination+"/"+file;
        if          (fs.statSync(path).isFile())         fs.copyFileSync(path, ldest);
        else                                            module.exports.recursiveCopy(path, ldest);
    })
}

/**
 * Create a directory if it doesn't exist, clear it if it already exists
 * @param {String} path                     relative path to the directory
 */
module.exports.mkNewDir = (path) => {
    if(fs.existsSync(path) && fs.statSync(path).isDirectory()) module.exports.recursiveDelete(path);
    fs.mkdirSync(path);
}

/**
 * Get list of subdirectory
 * @param {String} path                     relative path to the root directory
 */
module.exports.getSubDirectoriesList = (path) => {
    var output = [];
    var list = fs.readdirSync(path);
    for(var i = 0; i < list.length; i++){
        var curPath = path + '/' + list[i];
        if(fs.statSync(curPath).isDirectory()){
            output.push(curPath);
            var subList = module.exports.getSubDirectoriesList(curPath);
            for(var j = 0; j < subList.length; j++)
                output.push(subList[j]);
        }
    }

    return output;
}

/**
 * Get list of subfiles
 * @param {String} path                     relative path to the root directory
 */
module.exports.getSubFilesList = (path) => {
    var output = [];
    var list = fs.readdirSync(path);
    for(var i = 0; i < list.length; i++){
        if(list[i][0] == ".") continue;
        var curPath = path + '/' + list[i];
        if(fs.statSync(curPath).isFile())
            output.push(curPath);
        if(fs.statSync(curPath).isDirectory()){
            var subList = module.exports.getSubFilesList(curPath);
            for(var j = 0; j < subList.length; j++)
                output.push(subList[j]);
        }
    }

    return output;
}

/**
 * Filter a set of string following a pattern
 * @param {String[]} array                  An array to filter
 * @param {RegExp} regexp                   The filter
 */
module.exports.applyFilter = (array, regexp) => {
    var output = [];
    for(var i = 0; i < array.length; i++){
        if(array[i].match(regexp)) output.push(array[i]);
    }
    return output;
}

/**
 * Create a copy by specifying the directory path
 * @param {String} source                   A relative path to the source
 * @param {String} folder                   A relative path to the directory
 */
module.exports.copyToFolder = (source, folder) => {
    var fileName = source.split('/').pop();
    var destination = folder + '/' + fileName;
    if(fs.existsSync(destination) && fs.statSync(destination).isFile()) return;
    fs.copyFileSync(source, destination);
}

/**
 * Parse (using EJS Language) a template file
 * @param {String} source                   A relative path to the source file
 * @param {*} folder                        A relative path to the directory
 * @param {*} data                          The data which will be parse with the template file
 */
module.exports.parseToFolder = (source, folder, data) => {
    var output = "Error when parsing file";
    ejs.renderFile(source, data, (err, string) =>{
        if(err){
            log(err);
            return;
        }
        output = string;
    });
    var fileName = source.split('/').pop();
    var destination = folder + '/' + fileName;
    if(fs.existsSync(destination) && fs.statSync(destination).isFile()) return;
    fs.writeFileSync(destination, output);
}

/**
 * Parse EJS File   
 * @param {String} source                   A relative path to the source file
 * @param {String} destination              A relative path to the destination
 * @param {Object} data                     Object which will be parsed with files
 */
module.exports.parseEJS = (source, destination, data) => {
    var output = "Error when parsing file";
    ejs.renderFile(source, data, (err, string) =>{
        if(err){
            log(err);
            return;
        }
        output = string;
    });
    var fileName = source.split('/').pop();
    if(fs.existsSync(destination) && fs.statSync(destination).isFile()) return;
    fs.writeFileSync(destination, output);
}

/**
 * Copy a file to a destination folder, if a folder or a tree don't exist, it will be created
 * @param {String} source                   A relative path the source file
 * @param {String} destination              A relative path to the destinatio folder
 */
module.exports.copyWithTree = (source, destination) =>{
    log(source)
    var array = destination.split('/');
    var dirPath = '';
    for(var i = 0; i < array.length; i++){
        dirPath+= (i>0?'/':'')+array[i];
        if(!fs.existsSync(dirPath)){
            module.exports.mkNewDir(dirPath);
        }
    }
    module.exports.copyToFolder(source, destination);
}