# Modifying the arguments of an automatically registered Root field

It is not possible to amend the arguments of an automatically registered root field, such as the _By_ field registered when adding a custom post type (e.g. `forBarBy` for type `fooBar`).

Instead, this field needs to first be _[deregistered](https://github.com/wp-graphql/wp-graphql/blob/develop/access-functions.php#L164)_ then registered again with the desired arguments.

Deregistering a field is as simple as `deregister_graphql_field( $type_name, $field_name )` where `$type_name` is the name of the Type to remove the field from (e.g. `RootQuery`) and $field_name is the name of the field to remove (e.g. `forBarBy`).

Once the automatically registered field has been deregistered, it can be registered again with the desired args. In the below example, we are only supporting the _slug_ arg, and are adding a _password_ arg.

For a more complete example, and a great starting point, take a look at the core `By` function at [src/Type/Object/RootQuery.php](https://github.com/wp-graphql/wp-graphql/blob/develop/src/Type/Object/RootQuery.php#L209)

```
register_graphql_field(
	'RootQuery', 'fooBarBy', [
		'args'        => [
			'password' => [
				'description' => __( 'The password required for fetching a Foo Bar.', 'guggenheim' ),
				'type'        => 'String',
			],
			'slug'     => [
				'description' => __( 'Get the Foo Bar by its slug.', 'guggenheim' ),
				'type'        => 'String',
			],
		],
		'description' => __( 'A Foo Bar object.', 'guggenheim' ),
		'type'        => 'fooBar',
		'resolve'     => function( $post, $args, $context, $info ) {
			if ( ! check_press_password( $args['password'] ) ) {
				return null;
			}

			$post = get_page_by_path( $args['slug'], OBJECT, 'foo_bar' );
			if ( $post->post_type !== 'foo_bar' || $post->ID === 0 ) {
				throw new UserError( sprintf( __( 'No %1$s exists with slug %2$s' ), 'fooBar', $args['slug'] ) );
			}

			return $post ? new \WPGraphQL\Model\Post( $post ) : null;
		},
	]
);
```
