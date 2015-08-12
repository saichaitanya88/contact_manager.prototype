<h3>Contact Manager Prototype</h3>
<p>
Contact Manager Prototype is multi-tenant application that allows users to manage their contacts. Inspired by Eloqua and Salesforce, the application was built to allow schema to be customizable to suit the needs of different users. This application's <i>[immature]</i> framework aims to solve one of the problems in web development: providing platform as a service to multiple clients while fulfilling client-specific needs. 
</p>
<img src="notes/app-architecture.png" />
<p>As described by the figure above - The user is able to use the application through the browser or using a mobile application. The Core Application Engine, Client Application Engine and Client DB Router are powered by NodeJS. These three pieces work together to manage the users' Application Schema and retrieve users' data from their client database. </p>
<p>Each user is associated with their own database which becomes available to them when the user creates an account.</p>
<p>
The website is built using <b>Ruby On Rails</b> with <b>AngularJS</b>, this was to make the code base similar with the Mobile application which could be built using <b>Apache Cordova</b> and <b>Ionic Framework</b>. 
</p>
<p>
	REST API Guide: Please see the documentation in the swagger_ui folder <a>here</a>.
</p>
<p>
Concerns:
Since this is a prototype, there is no encryption of passwords or proper application level authentication. This can be added into the application source code. 
</p>
