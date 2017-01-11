module.exports = function(app) {

  app.get('/task/:taskId', function(req, res) {
    var connection = app.repository.connectionFactory();
    var taskRepository = new app.repository.taskRepository(connection);

    taskRepository.get(req.params.taskId, function(error, result) {
        if (error) {
            res.status(500).send(app.errorResponse(error));
        } else {
            res.status(201).send(app.successResponse(result));
        }
    });
  });

  app.post('/task', function(req, res) {
    var connection = app.repository.connectionFactory();
    var taskRepository = new app.repository.taskRepository(connection);
    var task = req.body;

    taskRepository.save(task, function(error, result) {
        if (error) {
            res.status(500).send(app.errorResponse(error));
        } else {
            res.status(201).send(app.successResponse(result));
        }
    });
  });

  app.post('/tasks', function(req, res) {
        var connection = app.repository.connectionFactory();
        var userConnection = app.repository.connectionFactory();
        var taskRepository = new app.repository.taskRepository(connection);
        var userRepository = new app.repository.userRepository(connection);
        var options = req.body;
        var userNotFoundMessage = {mensagem: 'usuário não encontrado.'};

        userRepository.get(options.userEmail, function(error, userResult) {
            if (error) {
                return res.status(500).send(app.errorResponse(error));
            }

            if (!userResult.length) {
                return res.status(404).json(app.errorResponse(userNotFoundMessage));
            }

            taskRepository.list(userResult[0].userId, function(error, taskResult) {
                if (error) {
                    return res.status(500).send(app.errorResponse(error));
                }
                
                if (!taskResult.length) {
                    return res.status(404).json(app.errorResponse(userNotFoundMessage));
                }

                res.status(201).json(app.successResponse(taskResult));
            });
        })
    });

  app.delete('/tasks/:taskId', function(req, res) {
    var connection = app.repository.connectionFactory();
    var taskRepository = new app.repository.taskRepository(connection);

    taskRepository.delete(req.params.taskId, function(error, result) {
        if (error) {
            res.status(500).send(app.errorResponse(error));
        } else {
            res.status(201).send(app.successResponse(result));
        }
    });
  });
};
