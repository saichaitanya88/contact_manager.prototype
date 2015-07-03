var AccountsAPI = require('./accounts').AccountsAPI;
var CustomObjectsAPI = require('./customObjects').CustomObjectsAPI;
var CustomObjectDataAPI = require('./customObjectData').CustomObjectDataAPI;
var ErrorHandler = require('./errors').errorHandler;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

module.exports = exports = function(app) {
  var accountsAPI = new AccountsAPI();
  var customObjectsAPI = new CustomObjectsAPI();
  var customObjectDataAPI = new CustomObjectDataAPI();
  // Account Actions
  app.post('/application/account', accountsAPI.CreateAccount);
  app.post('/application/account/signin', accountsAPI.SignInToAccount);
  app.get('/application/account/:accountId', accountsAPI.GetAccount);
  app.put('/application/account/:accountId', accountsAPI.UpdateAccount);

  // CustomObject Metadata Actions
  app.post('/application/account/:accountId/customObject', customObjectsAPI.CreateCustomObject);
  app.put('/application/account/:accountId/customObject/:customObjectId', customObjectsAPI.UpdateCustomObject);
  app.delete('/application/account/:accountId/customObject/:customObjectId', customObjectsAPI.DeleteCustomObject);
  app.get('/application/account/:accountId/customObjects', customObjectsAPI.SearchCustomObjects);
  app.get('/application/account/:accountId/customObject/:customObjectId', customObjectsAPI.GetCustomObject);

  app.get('/application/account/:accountId/customObject/:customObjectId/modelDefinitions', customObjectsAPI.GetCustomObjectModelDefinition);
  app.get('/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId', 
    customObjectsAPI.GetCustomObjectModelFieldDefinition);
  app.post('/application/account/:accountId/customObject/:customObjectId/modelDefinition', customObjectsAPI.CreateCustomObjectModelField);
  app.put('/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId', 
    customObjectsAPI.UpdateCustomObjectModelFieldDefinition);
  app.delete('/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId', 
    customObjectsAPI.DeleteCustomObjectModelFieldDefinition);
  
  app.get('/application/account/:accountId/customObject/:customObjectId/modelValidation', customObjectsAPI.GetCustomObjectModelValidation);
  app.post('/application/account/:accountId/customObject/:customObjectId/modelValidation', customObjectsAPI.CreateCustomObjectModelValidation);
  app.put('/application/account/:accountId/customObject/:customObjectId/modelValidation/:modelValidationId', customObjectsAPI.UpdateCustomObjectModelValidation);
  app.delete('/application/account/:accountId/customObject/:customObjectId/modelValidation/:modelValidationId', customObjectsAPI.DeleteCustomObjectModelValidation);

  // CustomObject Data Actions
  app.post('/application/account/:accountId/customObject/:customObjectId/data', customObjectDataAPI.CreateCustomObjectData);
  app.post('/application/account/:accountId/customObject/:customObjectId/data/search', customObjectDataAPI.SearchCustomObjectData);
  app.get('/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId', customObjectDataAPI.GetCustomObjectData);
  app.put('/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId', customObjectDataAPI.UpdateCustomObjectData);
  app.delete('/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId', customObjectDataAPI.DeleteCustomObjectData);

  app.all('*', function(req, res){
    logger.log("LoggingError".toUpperCase(), appModes.DEBUG)
    res.status(404).send('Unable to process request');
    ErrorHandler({message: '404: Unable to process request', stack: null}, req, res, null, false)
  });

  // Error handling middleware
  app.use(ErrorHandler);
}