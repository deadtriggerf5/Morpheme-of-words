const data = require('./prefixes.json');
const aZ = require('az');

const prefixCheck = (word) => {
    word = word.toLowerCase();
    var checked = '';
    var prefixAvailable = {
        success: false,
        name: null
    };
    for(var i = 0; i < word.length; i++){
        checked += word[i];
        if(data[checked]){
            prefixAvailable = {
                success: true,
                name: checked
            }
        }
    }
    return prefixAvailable;
}

const azLib = (text) => {
    console.log(aZ.Tokens(text));
    return {};
}

module.exports = {
    prefixCheck, 
    azLib
};