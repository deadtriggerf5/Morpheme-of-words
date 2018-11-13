const data = require('./prefixes.json');

const showRes = (word) => {
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

module.exports = showRes;