module.exports = function(app) {

  app.get('/task/:taskId', function(req, res) {
    var connection = app.repository.connectionFactory();
    var taskRepository = new app.repository.taskRepository(connection);

    taskRepository.get(req.params.taskId, function(error, result) {
        if (error) {
            res.status(500).json(app.errorResponse(error));
        } else {
            res.status(201).json(app.successResponse(result));
        }
    });
  });

  app.post('/task', function(req, res) {
    var connection = app.repository.connectionFactory();
    var taskRepository = new app.repository.taskRepository(connection);
    var task = req.body;

    taskRepository.save(task, function(error, result) {
        if (error) {
            res.status(500).json(app.errorResponse(error));
        } else {
            res.status(201).json(app.successResponse(result));
        }
    });
  });

  app.post('/tasks', function(req, res) {
        var connection = app.repository.connectionFactory();
        var userConnection = app.repository.connectionFactory();
        var taskRepository = new app.repository.taskRepository(connection);
        var beerRepository = new app.repository.beerRepository(connection);
        var options = req.body;
        var beerNotFoundMessage = { message: 'cerveja não encontrada.' };
        var taskNotFoundMessage = { message: 'tarefa não encontrada.' };

        beerRepository.get(options.beerId, function(error, beerResult) {
            if (error) {
                return res.status(500).json(app.errorResponse(error));
            }

            if (!beerResult.length) {
                return res.status(404).json(app.errorResponse(beerNotFoundMessage));
            }
            taskRepository.list(beerResult[0].beerId, function(error, taskResult) {
                console.log(error);
                console.log(taskResult);
                if (error) {
                    return res.status(500).json(app.errorResponse(error));
                }
                
                if (!taskResult.length) {
                    return res.status(404).json(app.errorResponse(taskNotFoundMessage));
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
            res.status(500).json(app.errorResponse(error));
        } else {
            res.status(201).json(app.successResponse(result));
        }
    });
  });
};
