---
title: Test
path: test
---

<Tip>
This is a tip, yo
</Tip>

<Warning>
This is a tip, yo
</Warning>

<Info>
This is a tip, yo
</Info>

<Danger>
### Here's a heading...
This is a tip, yo
</Danger>

Here's some text with <Highlight>some highlighted text</Highlight>, yo!

## Getting Started with GraphQL Queries 

This is an example of a simple GraphQL query, querying for a Post and asking for the Post ID and Title.

<Playground title="Query for a with ID and Title">
{
  posts {
    edges {
      node {
        id
        title
        date
      }
    }
  }
}
</Playground>