function userRepository (oConnection) {
    this._oConnection = oConnection;
}
userRepository.prototype.get = function(userId, callback) {
    this._connection.query('SELECT userId, name, email FROM user', callback);
}

module.exports = function () {
    return userRepository;
};
