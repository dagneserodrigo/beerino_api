module.exports = function(app) {

  app.get('/task/:taskId', function(req, res) {
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

  app.post('/task', function(req, res) {
    var connection = app.repository.connectionFactory();
    var taskRepository = new app.repository.taskRepository(connection);
    var task = req.body;

    taskRepository.save(task, function(error, result) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(result);
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

        userRepository.getByEmail(options.userEmail, function(error, userResult) {
            if (error) {
                return res.status(500).send(error);
            }

            if (!userResult.length) {
                return res.status(404).json(userNotFoundMessage);
            }

            taskRepository.list(userResult[0].userId, function(error, taskResult) {
                if (error) {
                    return res.status(500).send(error);
                }
                
                if (!taskResult.length) {
                    return res.status(404).json(userNotFoundMessage);
                }

                res.status(201).json(taskResult);
            });
        })
    });

  app.delete('/tasks/:taskId', function(req, res) {
    var connection = app.repository.connectionFactory();
    var taskRepository = new app.repository.taskRepository(connection);

    taskRepository.delete(req.params.taskId, function(error, result) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(result);
        }
    });
  });
};
