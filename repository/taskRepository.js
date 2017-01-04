function taskRepository(connection) {
    this._connection = connection;
};

taskRepository.prototype.get = function(taskId, callback) {
    this._connection.query('SELECT taskId, temperature, beerId, userId FROM task WHERE taskId = ?', taskId, callback);
};

module.exports = function() {
    return taskRepository;
}