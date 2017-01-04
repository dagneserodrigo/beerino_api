function userRepository (oConnection) {
    this._oConnection = oConnection;
}

userRepository.prototype.get = function(userId, callback) {
    this._connection.query('SELECT userId, name, email FROM user', callback);
}

userRepository.prototype.save = function(user, callback) {
     this._connection.query('INSERT INTO user SET ? ON DUPLICATE KEY UPDATE ?', [user, user], callback);
}

userRepository.prototype.list = function(pagingConfig, callback) {
    this._connection.query('SELECT userId, name, email FROM user LIMIT ?,?', [pagingConfig.page, pagingConfig.limit], callback);
}

module.exports = function () {
    return userRepository;
};
