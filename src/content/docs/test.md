---
title: Test
path: test
---

```graphql
# { "graphiql": true }
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
```

<Playground>
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