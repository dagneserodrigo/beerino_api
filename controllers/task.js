module.exports = function(app) {

  app.get('task/:taskId', function(req, res) {
    var connection = app.repository.connectionFactory();
    var taskRepository = new app.repository.taskRepository(connection);

    taskRepository.get(req.params.taskId, function(error, result) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(result);
        }
    });
  });

  app.post('task', function(req, res) {
    var connection = app.repository.connectionFactory();
    var taskRepository = new app.repository.taskRepository(connection);
    var task = req.body;

    taskRepository.get(task, function(error, result) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(result);
        }
    });
  });

  app.get('tasks/:page/:limit', function(req, res) {
    var connection = app.repository.connectionFactory();
    var taskRepository = new app.repository.taskRepository(connection);
    var pagingConfig = {
      page: req.params.page,
      limit: req.params.limit
    };

    taskRepository.list(pagingConfig, function(error, result) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(result);
        }
    });
  });
};
