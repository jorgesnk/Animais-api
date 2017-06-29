var bcrypt = require('bcryptjs');

crip = function (pass) {
    var salt = bcrypt.genSaltSync(5);
    var hash = bcrypt.hashSync(pass, salt);
    return hash;
}
desc=function(valid, bd){
    return bcrypt.compareSync(valid, bd)
}
module.exports = {
    crip,
    desc
}


