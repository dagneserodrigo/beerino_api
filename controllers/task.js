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

  app.delete('/task/:taskId', function(req, res) {
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

  app.post('/task/next', function(req, res) {
    var connection = app.repository.connectionFactory();
    var userConnection = app.repository.connectionFactory();
    var taskRepository = new app.repository.taskRepository(connection);
    var beerinoRepository = new app.repository.beerinoRepository(connection);
    var options = req.body;
    var beerino = undefined;

    beerinoRepository.get(options.beerinoId, function(error, result) {
        if (error) {
            return res.status(400).json(app.errorResponse(error));
        }

        beerino = result[0];

        if (!beerino.currentBeerId) {
            return res.status(400).json(app.errorResponse({message: 'Beerino não possui nenhuma cerveja.'}));
        }

        if (!beerino.currentTaskId) {
            taskRepository.getByBeerId(beerino.currentBeerId, function(error, result) {
                if (error) {
                    return res.status(400).json(app.errorResponse(error));
                }

                beerino.currentTaskId = result[0].taskId;

                var response = {
                    beerinoId: beerino.beerinoId,
                    order: result[0].order,
                    beerId: result[0].beerId,
                    time: result[0].time,
                    minTemp: (result[0].temperature - 2),
                    maxTemp: (result[0].temperature + 2)
                };

                beerinoRepository.save(beerino, function(error, result) {
                    if (error) {
                        return res.status(400).json(app.errorResponse(error));
                    }

                    return res.status(200).json(app.successResponse(response));
                });
            });
        } else {

            taskRepository.get(result[0].currentTaskId, function(error, result) {
                if (error) {
                    return res.status(400).json(app.errorResponse(error));
                }
            
                if (!result[0].taskId) {
                    return res.status(400).json(app.errorResponse({ message: 'Não foi possível buscar a tarefa que o beerino está executando.'}));
                }

                var params = {
                    beerId: result[0].beerId,
                    nextTaskOrder: (result[0].order + 1)
                };

                taskRepository.getNext(params, function(error, result) {
                    if (error) {
                        return res.status(400).json(app.errorResponse(error));
                    }

                    if (!(result[0] || {}).taskId) {
                        beerino.currentBeerId = null;
                        beerino.currentTaskId = null;
                        beerino.currentTemperature = null;
                        beerinoRepository.save(beerino, function(error, result) {
                            if (error) {
                                return res.status(400).json(app.errorResponse(error));
                            }

                            return res.status(200).send('end');
                        });
                    } else {
                        beerino.currentTaskId = result[0].taskId;

                        var response = {
                            beerinoId: beerino.beerinoId,
                            order: result[0].order,
                            beerId: result[0].beerId,
                            time: result[0].time,
                            minTemp: (result[0].temperature - 2),
                            maxTemp: (result[0].temperature + 2)
                        };

                        beerinoRepository.save(beerino, function(error, result) {
                            if (error) {
                                return res.status(400).json(app.errorResponse(error));
                            }

                            return res.status(200).json(app.successResponse(response));
                        });
                    }
                });
            });
        }
    });
  });
};
