---
title: Debugging
description: Tips and tricks on debugging with WPGraphQL
---

### Debug Mode

To set WPGraphQL in Debug Mode, add `define( 'GRAPHQL_DEBUG', true );` in your wp-config.php. 

This will provide more helpful errors in the response that may otherwise be hidden in a production environment. 

### Using Network Developer Tools to Inspect Responses

Using the GraphiQL Desktop App:
- Open up the Dev Tools (Mac: `command + option + i`)
- Find the network tab
- Execute a GraphQL request

Here you will see details of the request including the headers and body that were sent to WPGraphQL as well as the response, 
including the headers and body, that was returned by WordPress & WPGraphQL. 

![GraphiQL Network Tab for Debugging](https://dzwonsemrish7.cloudfront.net/items/021e0F033g0o0V0l3I3W/graphiql-network-tools.gif?v=5453536c)

This can be helpful for debugging. 

If you're having trouble with a resolver, for example, try `var_dump( 'something' );` within the resolver, then execute
and check out the response in the network tab. You can use that to debug many things within the Graph and gain introspection
into what's happening. . .for example you can use this to gain more insight into what `$source`, `$args`, `$context`, 
and `$info` are available for use within any given resolver.

For example, take this filter which adds a `myCustomField` field to the `Post` Type in the GraphQL Schema.

```php
add_filter( 'graphql_post_fields', function( $fields ) {

	$fields['myCustomField'] = [
		'type' => \WPGraphQL\Types::string(),
		'resolve' => function( $post, $args, $context, $info ) {
			var_dump( $post );
		}
	];

	return $fields;

} );
```

We should now see our `myCustomField` available in our Schema when querying for posts. When we execute a query for it, 
since the field resolver has a `var_dump` the request won't properly return JSON, but we can see what's being dumped 
in the network tab. 

![GraphiQL Network Tab - using var_dump()](https://dzwonsemrish7.cloudfront.net/items/0K3f2X2h3k3J0e0d0D0r/Image%202018-05-12%20at%2011.34.14%20AM.png?v=c71812ba)

In this case, we can see the 3 post objects being dumped. This can help determine that the data provided in the resolvers is
what you expect (or maybe _isn't_ what you expect). All resolvers are passed 4 variables: 

- `$root` The object/array being passed down the tree from the previous resolver
- `$args` The arguments input for the field
- `$context` The context of the request. This typically includes info about the current_user, but can contain more info
- `$info` Some information about where in the resolve tree the resolver is. It's possible for resolvers to be called many
different times within a single request, and sometimes having information about where in the resolve tree the resolver is
being called can be helpful. 

Any of these values could be `var_dumped()` in a resolver and inspected further to help understand context and debug when
things are behaving unexpectedly.
