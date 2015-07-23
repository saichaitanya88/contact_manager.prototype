<h3>Contact Manager Prototype</h3>
<p>
Contact Manager Prototype is multi-tenant application that allows users to manage their contacts. Inspired by Eloqua and Salesforce, the application was built to allow schema to be customizable to suit the needs of different users. This application's <i>[immature]</i> framework aims to solve one of the problems in web development: providing platform as a service to multiple clients while fulfilling client-specific needs. 
</p>
<img src="notes/app-architecture.png" />
<p>As described by the figure above - The user is able to use the application through the browser or using a mobile application. The Core Application Engine, Client Application Engine and Client DB Router are powered by NodeJS. These three pieces work together to manage the users' Application Schema and retrieve users' data from their client database. </p>
<p>Each user is associated with their own database which becomes available to them when the user creates an account.</p>
<p>
The website is built using <b>Ruby On Rails</b> with <b>AngularJS</b>, this was to make the code base similar with the Mobile application which is built using <b>Apache Cordova</b> and <b>Ionic Framework</b>. 
</p>
<p>
	REST API Guide: Please see the live documentation <a>here</a>.
</p>

<blockquote><p>Create Account</p></blockquote>
<pre>
POST /application/account
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Sign in to Account</p></blockquote>
<pre>
POST /application/account/signin
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Get Account</p></blockquote>
<pre>
GET /application/account/:accountId
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Update Account</p></blockquote>
<pre>
PUT /application/account/:accountId
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Create CustomObject</p></blockquote>
<pre>
POST /application/account/:accountId/customObject
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Update CustomObject</p></blockquote>
<pre>
PUT /application/account/:accountId/customObject/:customObjectId
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Delete CustomObject</p></blockquote>
<pre>
DELETE /application/account/:accountId/customObject/:customObjectId
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Search CustomObjects</p></blockquote>
<pre>
GET /application/account/:accountId/customObjects?name={name}&description={description}
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Get CustomObject</p></blockquote>
<pre>
GET /application/account/:accountId/customObject/:customObjectId
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Get CustomObject ModelDefinitions</p></blockquote>
<pre>
GET /application/account/:accountId/customObject/:customObjectId/modelDefinitions
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Get CustomObject ModelDefinition</p></blockquote>
<pre>
GET /application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Create CustomObject ModelDefinitions</p></blockquote>
<pre>
POST /application/account/:accountId/customObject/:customObjectId/modelDefinition
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Update CustomObject ModelDefinitions</p></blockquote>
<pre>
PUT /application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Delete CustomObject ModelDefinition</p></blockquote>
<pre>
DELETE /application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>
 
<blockquote><p>Create CustomObjectData</p></blockquote>
<pre>
POST /application/account/:accountId/customObject/:customObjectId/data
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Search CustomObjectData</p></blockquote>
<pre>
POST /application/account/:accountId/customObject/:customObjectId/data/search
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Get CustomObjectData</p></blockquote>
<pre>
GET /application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Update CustomObjectData</p></blockquote>
<pre>
PUT /application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<blockquote><p>Delete CustomObjectData</p></blockquote>
<pre>
DELETE /application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId
<p>
	Request: {}
</p>
<p>
	Response: {}
</p>
</pre>

<p>
Flow:
AuthApp, AuthAcc, Parse Request, Map Request Object to Model, Validate, Perform CRUD
</p>
<p>
Validation:
Validation at this time only exists for CustomObject and CustomObjectData mapping, but no custom validation yet. 
</p>
<p>
Roadmap:
Validations for models. Js library will be exposed. 
</p>
<p>
Concerns:
Since this is a prototype, there is no encryption of passwords or proper application level authentication. This can be added into the application source code. 
</p>