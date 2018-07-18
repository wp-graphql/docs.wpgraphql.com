---
title: Custom Post Types and Taxonomies
---

# Exposing Custom Post Types in WPGraphQL

Adding Custom Post Types to the WPGraphQL schema is simple. When registering a post_type simply declare `show_in_graphql` as true and provide a `graphql_single_name` and `graphql_plural_name`. 

For example: 

```
add_action( 'init', function() {
	register_post_type( 'book', [
		'label' => __( 'Books', 'wp-graphql-publishers' ),
		'supports' => [ 'title', 'editor' ],
		'public' => true,
		'show_in_graphql' => true,
		'graphql_single_name' => 'book',
		'graphql_plural_name' => 'books',
	] );
} );
```

This will register a "books" post_type to your WordPress site and will expose the post_type to your GraphQl schema. 

You could now run this query on your site:

```
query GET_BOOKS {
  books {
    edges {
      node {
        id
        title
        date
      }
    }
  }
}
```

# Exposing Custom Taxonomies in WPGraphQL

Exposing custom taxonomies in WPGraphQL is simple. Much like custom post types, just 3 fields need to be added to the taxonomy registry.

For example, here's how you could register a "Genre" Taxonomy that would be connected to the "Books" post type:

```
add_action( 'init', function() {
	register_taxonomy( 'genre', 'book', [
		'label' => __( 'Genre' ),
		'public' => true,
		'show_in_graphql' => true,
		'graphql_single_name' => 'genre',
		'graphql_plural_name' => 'genres',
		'hierarchical' => true,
	]);
} );
```

This would allow for a query like so:

```
query GET_GENRES {
  genres {
    edges {
      node {
        id
        name
        description
      }
    }
  }
}
```

## Post Type and Taxonomy Connections

When you register a post_type and taxonomy to be connexted in WordPress, like we've registered the Genre taxonomy to be connected to the Book post_type, WPGraphQL makes use of the connection to expose fields on each of the types so you can easily query for connected data.

For example: 

```
query GET_GENRES {
  genres {
    edges {
      node {
        id
        name
        description
        books { 
          edges {
            node {
              id
              title
            }
          }
        }
      }
    }
  }
}
```

Here we can get a list of Genre terms, and on each term we can get a list of connected books. 

Alternatively you can get a list of books and connected genres:

```
query GET_BOOKS {
  books {
    edges {
      node {
        id
        title
        date
        genres {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
}
```



