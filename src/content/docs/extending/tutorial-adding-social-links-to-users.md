---
title: "Tutorial\: Adding Social Links to Users"
description: "Learn to add social links to users that can be queried and mutated"
---

This is a quick tutorial that shows how to add Social Links to Users. The social links will be stored as usermeta
and we'll look at how to query the social links and mutate them. 

This can easily be applied to any other usermeta that needs to be stored.

At the end of this tutorial, you should be able to do the following in GraphiQL:

![GraphiQL User Social Links](https://dzwonsemrish7.cloudfront.net/items/3R0742373S28113o3t2Z/wp-graphql-user-social-links.gif?v=fd7edbb2)

### Our approach

In order to accomplish what we're after, we need to do 3 things: 

- expose the fields to be queryable on the User type
- expose input fields for the User Input to mutate the user
- hook into the user mutation to handle the input data to be saved

### Step 1: expose fields to be queryable on the User type

```
add_filter( 'graphql_user_fields', function( $fields ) {

	$fields['socialLinks'] = [
		'type' => new \WPGraphQL\Type\WPObjectType([
			'name' => 'UserProfileSocialLinks',
			'fields' => [
				'twitter' => [
					'type' => \WPGraphQL\Types::string(),
					'description' => __( 'Twitter url for the user', 'your-textdomain' )
				],
				'facebook' => [
					'type' => \WPGraphQL\Types::string(),
					'description' => __( 'Facebook url for the user', 'your-textdomain' )
				],
				'instagram' => [
					'type' => \WPGraphQL\Types::string(),
					'description' => __( 'Instagram url for the user', 'your-textdomain' )
				],
			],
		]),
		'description' => __( 'Social links for the user', 'your-textdomain' ),
		'resolve' => function( \WP_User $user, $args, $context, $info ) {

			$social_links = get_user_meta( $user->ID, 'social_links', true );
			return ! empty( $social_links ) && is_array( $social_links ) ? $social_links : null;

		},
	];

	return $fields;

} );
```

This filters the `User` type in the WPGraphQL schema allowing for the social links to be queried on a user, with a query such as (swap out the ID with an actual ID for your site): 

```
{
  user( id: "...") {
      socialLinks {
          twitter
          facebook
          instagram
      }
  }
}
```

### Step 2: expose input fields for the User Input to mutate the user

```
function graphql_user_social_links_input( $fields ) {

	$fields['socialLinks'] = [
		'type' => new \WPGraphQL\Type\WPInputObjectType([
			'name' => 'UserProfileSocialLinksInput',
			'fields' => [
				'twitter' => [
					'type' => \WPGraphQL\Types::string(),
					'description' => __( 'Twitter url for the user', 'your-textdomain' )
				],
				'facebook' => [
					'type' => \WPGraphQL\Types::string(),
					'description' => __( 'Facebook url for the user', 'your-textdomain' )
				],
				'instagram' => [
					'type' => \WPGraphQL\Types::string(),
					'description' => __( 'Instagram url for the user', 'your-textdomain' )
				],
			],
		]),
		'description' => __( 'Social links for the user', 'your-textdomain' ),
	];

	return $fields;

}

add_filter( 'graphql_user_mutation_input_fields', 'graphql_user_social_links_input', 10, 1 );
```

This filters the input fields for creating/updating users to accept social links input like so: 

```
mutation {
  updateUser(input:{
    clientMutationId:"updateUser"
    id:"..."
    socialLinks:{
      twitter:"@twitteruser"
      facebook:"myusername"
      instagram:"myaccount"
    }
  }) {
    user {
      id
      socialLinks {
        twitter
        facebook
        instagram
      }
    }
  }
}
```

This is allowing the input in the Schema, but it's not _doing_ anything with the input. Since we ultimately want the links to persist to usermeta under the key `social_links` we now have to listen for the input and save it. . . that brings us to step 3. 

### Step 3: hook into the user mutation to handle the input data to be saved

```
add_action( 'graphql_user_object_mutation_update_additional_data', function( $user_id, $input, $mutation_name, $context, $info ) {

	$social_link_input = ! empty( $input['socialLinks'] ) ? $input['socialLinks'] : [];

	if ( empty( $social_link_input ) ) {
		return;
	}

	$social_links = get_user_meta( $user_id, 'social_links', true );
	$social_links = ! empty( $social_links ) && is_array( $social_links ) ? $social_links : [];

	if ( ! empty( $social_link_input['twitter'] ) ) {
		$social_links['twitter'] = sanitize_text_field( $social_link_input['twitter'] );
	}

	if ( ! empty( $social_link_input['facebook'] ) ) {
		$social_links['facebook'] = sanitize_text_field( $social_link_input['facebook'] );
	}

	if ( ! empty( $social_link_input['instagram'] ) ) {
		$social_links['instagram'] = sanitize_text_field( $social_link_input['instagram'] );
	}

	update_user_meta( $user_id, 'social_links', $social_links );

}, 10, 5 );
```

The hook `graphql_user_object_mutation_update_additional_data` runs during user mutations and we can hook into it to update additional data, such as meta, associated with a user. 

Here, we first look to see if there's any `socialLinks` input before proceeding. 

If there is, we get the existing stored socialLinks, then merge the input data, and save the new data back to usermeta. 

this allows for the mutation above to work properly. We can pass `socialLinks` input to the user, and the data is persisted and queryable on the User type. 

Step 2: expose input fields for the User Input to mutate the user

```
function graphql_user_social_links_input( $fields ) {

	$fields['socialLinks'] = [
		'type' => new \WPGraphQL\Type\WPInputObjectType([
			'name' => 'UserProfileSocialLinksInput',
			'fields' => [
				'twitter' => [
					'type' => \WPGraphQL\Types::string(),
					'description' => __( 'Twitter url for the user', 'your-textdomain' )
				],
				'facebook' => [
					'type' => \WPGraphQL\Types::string(),
					'description' => __( 'Facebook url for the user', 'your-textdomain' )
				],
				'instagram' => [
					'type' => \WPGraphQL\Types::string(),
					'description' => __( 'Instagram url for the user', 'your-textdomain' )
				],
			],
		]),
		'description' => __( 'Social links for the user', 'your-textdomain' ),
	];

	return $fields;

}

add_filter( 'graphql_user_mutation_input_fields', 'graphql_user_social_links_input', 10, 1 );
```

This filters the input fields for creating/updating users to accept social links input like so: 

```
mutation {
  updateUser(input:{
    clientMutationId:"updateUser"
    id:"..."
    socialLinks:{
      twitter:"@twitteruser"
      facebook:"myusername"
      instagram:"myaccount"
    }
  }) {
    user {
      id
      socialLinks {
        twitter
        facebook
        instagram
      }
    }
  }
}
```

This is allowing the input in the Schema, but it's not _doing_ anything with the input. Since we ultimately want the links to persist to usermeta under the key `social_links` we now have to listen for the input and save it. . . that brings us to step 3. 

- Step 3: hook into the user mutation to handle the input data to be saved

```
add_action( 'graphql_user_object_mutation_update_additional_data', function( $user_id, $input, $mutation_name, $context, $info ) {

	$social_link_input = ! empty( $input['socialLinks'] ) ? $input['socialLinks'] : [];

	if ( empty( $social_link_input ) ) {
		return;
	}

	$social_links = get_user_meta( $user_id, 'social_links', true );
	$social_links = ! empty( $social_links ) && is_array( $social_links ) ? $social_links : [];

	if ( ! empty( $social_link_input['twitter'] ) ) {
		$social_links['twitter'] = sanitize_text_field( $social_link_input['twitter'] );
	}

	if ( ! empty( $social_link_input['facebook'] ) ) {
		$social_links['facebook'] = sanitize_text_field( $social_link_input['facebook'] );
	}

	if ( ! empty( $social_link_input['instagram'] ) ) {
		$social_links['instagram'] = sanitize_text_field( $social_link_input['instagram'] );
	}

	update_user_meta( $user_id, 'social_links', $social_links );

}, 10, 5 );
```

The hook `graphql_user_object_mutation_update_additional_data` runs during user mutations and we can hook into it to update additional data, such as meta, associated with a user. 

Here, we first look to see if there's any `socialLinks` input before proceeding. 

If there is, we get the existing stored socialLinks, then merge the input data, and save the new data back to usermeta. 

this allows for the mutation above to work properly. We can pass `socialLinks` input to the user, and the data is persisted and queryable on the User type. 