---
title: "Auth with WPGraphQL"
path: "advanced/auth"
description: "How Authentication and Authorization with WPGraphQL"
---

### GraphQL Mutations vs Queries
From a technical perspective, the only differences between GraphQL Queries and Mutations is the `mutation` keyword, and the GraphQL spec requires mutations to by processed synchronously, where queries can be processed Async (in environments that support it).

Other than that, Queries and Mutations are the same, **they're both just strings that map to functions**. 

### Auth with WPGraphQL
Now that we're clear on Queries v. Mutations (both are just maps to functions), Auth is left up to the application, not GraphQL. 

> #### Auth: Authentication / Authorization
> **Authentication** is the process of verifying who you are (logging in)
> **Authorization** is the process of verifying that you have access to something (query private data, or mutate data)

### Authentication with WPGraphQL
Since WPGraphQL is a WordPress plugin that adheres largely to common WordPress practices, there are many ways to make authenticated WPGraphQL requests. 

For **remote HTTP requests** to the `/graphql` endpoint, existing authentication plugins should work fine. These plugins make use of sending data in the Headers of requests and validating the credentials and setting the user before execution of the API request is returned: 
* https://github.com/WP-API/Basic-Auth (even though it's labeled for the REST API, it works well with WPGraphQL – but not recommended for non-SSL connections)
* https://github.com/WP-API/OAuth1 (labeled for use with the WP REST API, but works well with WPGraphQL)
* https://github.com/wp-graphql/wp-graphql-jwt-authentication (This is still a bit of a Work in Progress. It works great, but the shape of requests, etc is still evolving a bit. Stay tuned for it to reach stability)

If the remote request is within the WordPress admin, such as the WPGraphiQL plugin, you can use the existing Auth nonce as seen in action here: https://github.com/wp-graphql/wp-graphiql/blob/master/assets/app/src/App.js#L16-L29

For **non-remote requests** (PHP function calls), if the context of the request is already authenticated, such as an Admin page in the WordPress dashboard, existing WordPress authentication can be used, taking advantage of the existing session. For example, if you wanted to use a GraphQL query to populate a dashboard page, you could send your query to the `do_graphql_request( $query )` function, and since the request is already authenticated, GraphQL will execute with the current user set, and will execute what they have permission to execute.

### Authorization with WPGraphQL
Since WPGraphQL is built as a WordPress plugin, it makes use of WordPress core methods to determine the current user for the request, and execute with that context. 

The mutations that WPGraphQL provide out of the box attempt to adhere to best practices in regards to respecting user roles and capabilities. Whether the mutation is creating, updating or deleting content, WPGraphQL checks for capabilities before executing the mutation. 

For example, any mutation that would create a post will first check to make sure the current user has proper capabilities to create a post. You can see that in action here: https://github.com/wp-graphql/wp-graphql/blob/8aa13908bf1f08a97084adb0940553c132d96468/src/Type/PostObject/Mutation/PostObjectCreate.php#L65

Mutations are not alone when it comes to checking capabilities. Some queries expose potentially sensitive data, such as the email address field in generalSettings. By default, this field will only resolve if the request is authenticated, meaning that the value of the email address is only exposed to logged in users. 

A public, non authenticated request would return a null value for the field and would return an error message in the GraphQL response. However, it wouldn't block the execution of the entire GraphQL request, just that field. So, if the request had a mix of publicly allowed fields and private fields, GraphQL would still execute the public data. For example, trying a query like:

```graphql
{
  generalSettings {
    title
    email
  }
}
```
The title field is public, but the email field is private (requires the request to be authenticated), so the response would look like: 

```json
{
  "errors": [
    {
      "message": "Sorry, you do not have permission to view this setting.",
      "category": "user",
      "locations": [
        {
          "line": 4,
          "column": 5
        }
      ],
      "path": [
        "generalSettings",
        "email"
      ]
    }
  ],
  "data": {
    "generalSettings": {
      "title": "WPGraphQL Local Dev",
      "email": null
    }
  }
}
```

Here, you can see that the title was resolved, but the email field had a null value and a message was provided in the errors. 

If the request had been authenticated, the response would have looked like: 

```json
{
  "data": {
    "generalSettings": {
      "title": "WPGraphQL Local Dev Site",
      "email": "test@wpgraphql.test"
    }
  }
}
```

Resolving the title and email field, and not providing any errors.

### Granular control over Authorization
WPGraphQL is easily filtered, giving you fine control over each field in the Schema. 

For example sake, let's say your system contains sensitive data in Post excerpts, and you only want that data exposed to logged in users. 

You could filter the resolver of the excerpt field like so, ensuring the field will return a null value for any non-authenticated request.

```php
add_filter( 'graphql_post_fields', function( $fields ) {
   
  // make sure the excerpt field exists before trying to modify it
  if ( ! empty( $fields['excerpt'] ) ) {

     // If there is no current user authenticated, override the resolver so it returns a null value
     if ( 0 === wp_get_current_user()->ID ) {

         $fields['excerpt']['resolve'] = function() {
            return null; 
        }

     }

  }
  
  return $fields;
}  );
```

There are also helpers in the Schema definition, allowing you to more easily define if a field should be considered private by GraphQL, so you could accomplish the same thing like so:

```php
add_filter( 'graphql_post_fields', function( $fields ) {
   
  // make sure the excerpt field exists before trying to modify it
  if ( ! empty( $fields['excerpt'] ) ) {
       $fields['excerpt']['isPrivate'] => true;
  }

}
```