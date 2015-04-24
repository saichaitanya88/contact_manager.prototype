/*
  Maps the Metadata to the Client's database
*/

"use strict";

function MetadataMapper(){
	this.GetMetadata = function(json){
		var meta_data = new Metadata(json);
		return meta_data;
	}
}

function Metadata(jObject){
	this._id = jObject._id;
	this.client_id = jObject.client_id;
	this.database = jObject.database;
	this.server_name = jObject.server_name;
	this.data_objects = new DataObject(jObject.data_objects);
	this.access_roles = undefined;
}

function DataObject(jObject){
	this.info = new Info(jObject.info);
	this.object_type = jObject.object_type;
	this.fields = new Array();
	for each field in jObject.fields
	{
		fields.push(new Field(field));
	}
}

function Field(jObject){
	this.info = new Info(jObject.info);
	this.data_type = jObject.data_type;
	this.access_roles = undefined;
}

function Info(jObject){
	this.system_name = jObject.system_name;
	this.display_name = jObject.display_name;
	this.description = jObject.description;
}

module.exports.MetadataMapper = MetadataMapper;


/*
{
  "meta_data": {
    "_id": "ObjectID(_id)",
    "client_id": "ObjectID(_id)",
    "database": "database_name",
    "server_name" : "server_name",
    "data_objects": [
      {
        "data_object": {
          "system_name": "contacts",
          "display_name": "Contacts",
          "description" : "This object is used to store the contact information",
          "object_type": "system/custom",
          "fields": [
            {
              "field": {
                "system_name": "first_name",
                "display_name": "First Name",
                "description" : "Contact's First Name",
                "data_type": "String",
                "access_roles": {
                  "info": "not implemented",
                  "schema": {
                    "read_roles": [
                      "role1",
                      "role2"
                    ],
                    "write_roles": [
                      "role1",
                      "role2"
                    ],
                    "modify_roles": [
                      "role1",
                      "role2"
                    ]
                  },
                  "data": {
                    "read_roles": [
                      "role1",
                      "role2"
                    ],
                    "write_roles": [
                      "role1",
                      "role2"
                    ],
                    "modify_roles": [
                      "role1",
                      "role2"
                    ]
                  }
                }
              }
            },
            {
              "field": {
                "system_name": "last_name",
                "display_name": "Last Name",
                "data_type": "data_type",
                "access_roles": {
                  "info": "not implemented",
                  "schema": {
                    "read_roles": [
                      "role1",
                      "role2"
                    ],
                    "write_roles": [
                      "role1",
                      "role2"
                    ],
                    "modify_roles": [
                      "role1",
                      "role2"
                    ]
                  },
                  "data": {
                    "read_roles": [
                      "role1",
                      "role2"
                    ],
                    "write_roles": [
                      "role1",
                      "role2"
                    ],
                    "modify_roles": [
                      "role1",
                      "role2"
                    ]
                  }
                }
              }
            }
          ],
          "access_roles": {
            "schema": {
              "read_roles": [
                "role1",
                "role2"
              ],
              "write_roles": [
                "role1",
                "role2"
              ],
              "modify_roles": [
                "role1",
                "role2"
              ]
            },
            "data": {
              "read_roles": [
                "role1",
                "role2"
              ],
              "write_roles": [
                "role1",
                "role2"
              ],
              "modify_roles": [
                "role1",
                "role2"
              ]
            }
          }
        }
      }
    ]
  }
}
*/