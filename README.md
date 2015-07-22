<h3>Contact Manager Prototype</h3>
<div>
<p>
Contact Manager Prototype - Inspired by Eloqua and Salesforce, this is a prototype multi-tenant application that allows users to maintain customizable data in their database. Users can create new tables (or customObjects) and store data specific to their schema. The backend for this application is written using the MEAN stack. Web application is built using Ruby on Rails and the Mobile application is built using Ionic Cordova. For more information regarding the API and design, please see github... 
</p>

<img src="notes/app-architecture.png" />

<p>
Contact Manager Prototype is multi-tenant application that allows users to manage their contacts. Inspired by Eloqua and Salesforce, the application was built to allow schema to be customizable to suit the needs of different users. This application's [immature] framework aims to solve one of the problems in web development: providing platform as a service to multiple clients while fulfilling client-specific needs. 
</p>
REST API Guide:
Urls, requests, responses

Diagrams: 


Flow:
AuthApp, AuthAcc, Parse Request, Map Request Object to Model, Validate, Perform CRUD

Validation:
Validation exists for CustomObject, CustomObjectData mapping, but no custom validation yet. 

Roadmap:
Validations for models. Js library will be exposed. 
</div>