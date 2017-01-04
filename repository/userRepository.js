function userRepository (oConnection) {
    this._oConnection = oConnection;
}

userRepository.prototype.get = function(userId, callback) {
    this._connection.query('SELECT userId, name, email FROM user WHERE userId = ?', userId, callback);
}

userRepository.prototype.save = function(user, callback) {
     this._connection.query('INSERT INTO user SET ? ON DUPLICATE KEY UPDATE ?', [user, user], callback);
}

userRepository.prototype.list = function(pagingConfig, callback) {
    this._connection.query('SELECT userId, name, email FROM user LIMIT ?,?', [pagingConfig.page, pagingConfig.limit], callback);
}

userRepository.prototype.delete = function(userId, callback) {
    this._connection.query('DELETE FROM user WHERE userId = ?', userId, callback);
}

module.exports = function () {
    return userRepository;
};
