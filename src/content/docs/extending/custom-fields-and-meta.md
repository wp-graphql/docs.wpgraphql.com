---
title: Custom Fields and Meta
---

Exposing custom field/meta in WPGraphQL is pretty easy!

Let's say you had a "color" field on your Post post_type that stored a hex code of a color for the post, and you wanted to expose the color field in your GraphQl schema.

Since the field is on the Post post_type, and the field key is "color" and the value, when populated, is a String, we have enough information to add our field to the GraphQl Schema.

```
add_filter( 'graphql_post_fields', function( $fields ) {
	$fields['color'] = [
		'type' => \WPGraphQL\Types::string(),
		'description' => __( 'The color custom field', 'your-textdomain' ),
		'resolve' => function( \WP_Post $post ) {
      $color = get_post_meta( $post->ID, 'color', true );
			return ! empty( $color ) ? esc_html( $color ) : null;
		},
	];
	return $fields;
} );
```

This filter adds the `color` field to the Schema for posts, but other post_types won't be affected, as each post_type has a unique type in thr GraphQL Schema. 

The `type` is the contract between the server and the client, declaring what kind of data to expect when querying the field. In this case, we define the type as a string, so the client is aware that anytime they ask for the `color` field a string or null will be returned.

The description is added to help document the Schema, both in code - as it's coupled with the field definition - but also for putput in tools such as GraphiQl, which shows field descriptions in the Documentation explorer.

The resolve function is where the magic happens. Since we're filtering the "Post" type, we will be passed a Post object for the field resolver to use. This field gets the ID from the Post and uses it to query the `color` post_meta and return the value, if there is one.

Resolvers can do anything to get the data. In this case, we queried for post_meta from WordPress, but the resolver could easily get data from anywhere else, including other remote APIs, as long as it fulfills the contract of returning a string or null.

## Other field types

Of course, not all fields are strings. In fact, fields can return any Type thats been registered to the Schema. 

