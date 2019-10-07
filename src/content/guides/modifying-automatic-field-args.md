# Modifying the arguments of an automatically registered Root field

It is not possible to amend the arguments of an automatically registered root field, such as the _By_ field registered when adding a custom post type (e.g. `forBarBy` for type `fooBar`).

Instead, this field needs to first be _[deregistered](https://github.com/wp-graphql/wp-graphql/blob/develop/access-functions.php#L164)_ then registered again with the desired arguments. 
