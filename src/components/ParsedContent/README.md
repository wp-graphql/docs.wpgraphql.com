# Content
This is a special component that parses Markdown for specific inline React components. 

Supported components:

### GraphQL
This component takes the child query, and renders it in a split pane with the query on the left and the 
executed results on the right. The query executes against `api.wpgraphql.com`.
```
<GraphQL title="Title of the example">
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
</GraphQL>
```

### Tip
This converts the contents to a Tip box, making it easy for content to stand out.

`<Tip>This is a tip!</Tip>`

### Info
This converts the contents to an Info box, making it easy for content to stand out.

`<Info>This is a bit of info</Info>`

### Warning
This converts the contents to a Warning box, making it easy for content to stand out.

`<Warning>This is a warning</Warning>`

### Danger
This converts the contents to a Danger box, making it easy for content to stand out.

`<Danger>This is a danger message</Danger>`

### Highlight
This allows for text to be highlighted within a sentence.

This is some `<Highlight>highlighted</Highlight>` text

