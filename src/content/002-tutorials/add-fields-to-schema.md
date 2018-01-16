---
title: "Adding fields to the Schema"
description: Learn how to hook into the WPGraphQL Schema to add fields for your custom needs.
path: tutorials/add-fields-to-schema
---

## How to add fields to the WPGraphQL Schema

<Playground height="200">

```graphql
{
  posts {
    edges {
        node {
            id
            title
        }
    }
  }
}
```
</Playground>

<Tip>Did you know, dog?</Tip>