---
title: GraphQL Queries
description: "Get started with some basic GraphQL Queries"
---

> Below are some basic queries to try out in your GraphiQL IDE. The examples below show the
query on the left and the response (executing against a _**live**_ WPGraphQL endpoint) on the right. Copy the
query from the left and paste it in your GraphiQL IDE and see what data you get back from your WordPress
install.

### List of posts


<GraphQL title="Get a list of posts">
{
  posts {
    edges {
      node {
        id
        title
        date
        content
      }
    }
  }
}
</GraphQL/>

#### Get a List of Posts with Author info

This is a pretty neat example of the power of GraphQL. Posts and Users are stored in different tables in WordPress and 
getting Post Data and User data typically requires multiple queries. 

You would typically first use `WP_Query` to get a list of posts, then while looping through the posts, you would get the author data by querying for that.

GraphQL drastically simplifies that, allowing you to just declare what fields you want from each post, and what fields you want from each Post's author. And, 
behind the scenes, WPGraphQL is doing some cool stuff to optimize the queries to make sure the fewest possible queries are run
to get the needed data. [Learn More](/docs/advanced/deferred-resolvers)

<GraphQL title="List of posts with author info">
{
  posts {
    edges {
      node {
        id
        title
        date
        author {
          id
          name
          username
          description
        }
      }
    }
  }
}
</GraphQL>

<GraphQL title="Get a list of users">
{
  users {
    edges {
      node {
        id
        name
        username
      }
    }
  }
}
</GraphQL>

#### Get a List of Users with their Recent Posts

We saw earlier how we can query for Author data on posts, but we can also get to posts from the user as well.

Here we are going to query for a list of users, then ask for each users posts, and for each post ask for the author. 

That makes my head spin, but it's really not _that_ uncommon of a need.

Try executing this and see what you get. 

<GraphQL title="Get a list of users & their recent posts">
{
  users {
    edges {
      node {
        id
        name
        username
        posts {
          edges {
            node {
              id
              title
              date
              author {
                id
                name
                username
                description
              }
            }
          }
        }
      }
    }
  }
}
</GraphQL>
You should see a list of users, and on each user you should see a list of posts, if that user has any, or empty post.edges if they don't. Then the posts should have an author field with the same author data as the user node.

Pretty neat!

## Exploring Aliases

GraphQL has a subtle but very powerful feature called Aliasing. You can set aliases on fields as you query, and the fields will
be returned to you using the specified Alias. 

This really puts a lot of power in the clients hands.

Lets try a simple query with Aliases.

<GraphQL title="Exploring Aliases">
{
  recentPosts: posts {
    items: edges {
      post: node {
        globalId: id
        id: postId
        articleTitle: title
        articleDate: date
      }
    }
  }
}
</GraphQL>

Now run that query and see how the fields are returned with the Aliases set as the key in the response. Wow!

## Exploring Variables

Variables are a very powerful feature of GraphQL.  

> ### Coming Soon
> Until we have time to write more info on this, you can learn more [here](http://graphql.org/learn/queries/#variables)

## Keep Exploring

At this point, you should be familiar enough with GraphiQL to continue exploring what kind of data you can access.

## Debugging Requests

> ### Disclaimer 
> This section applies particularly to the [GraphiQL Desktop App](https://github.com/skevy/graphiql-app) as it's an Electron app.

Since the GraphiQL Desktop App is an Electron App, it's built on Chromium, which means we can open up Chrome developer tools `Command + Option + I`

Then in Developer tools, navigate to the `Network` tab.

With the `Network` tab open, execute a GraphQL Query.

You can see the requests that are sent and the payloads that are returned. You can explore the headers and the formatting that GraphiQL uses to send requests, etc.

Using the Network tab can be helpful for debugging when something goes wrong and no response is rendered in the GraphiQL response pane.

> ### More info coming soon
> This section needs more info...