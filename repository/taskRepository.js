function taskRepository(connection) {
    this._connection = connection;
};

taskRepository.prototype.get = function(taskId, callback) {
    this._connection.query('SELECT taskId, temperature, beerId, userId FROM task WHERE taskId = ?', taskId, callback);
};

taskRepository.prototype.save = function(task, callback) {
    this._connection.query('INSERT INTO task SET ? ON DUPLICATE KEY UPDATE ?', [task, task], callback);
};

taskRepository.prototype.list = function(pagingConfig, callback) {
    this._connection.query('SELECT taskId, temperature, beerId, userId FROM task LIMIT ?,?', [pagingConfig.page, pagingConfig.limit], callback);
};

taskRepository.prototype.delete = function(taskId, callback) {
    this._connection.query('DELETE FROM task WHERE taskId = ?', taskId, callback);
};

module.exports = function() {
    return taskRepository;
}