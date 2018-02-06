---
title: Contributing to Docs
description: "Learn how to contribute to the documentation."
path: contributing/documentation
---

This site is powered by [Gatsby.js](https://gatsbyjs.org). 

Taking advantage of the power of Gatsby and the React ecosystem, the content of this site is populated
by Markdown files in the `/src/content/` directory, with support for some special inline components that you can 
place in the Markdown files.

Below are some examples of the special components you can add to the documentation.

----

# h1 heading
## h2 heading
### h3 heading
#### h4 heading
##### h5 heading
###### h6 heading

<Collapse title="Show code">

```
# h1 heading
## h2 heading
## h3 heading
#### h4 heading
##### h5 heading
###### h6 heading
```

</Collapse>

## Blockquote

> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

<Collapse title="Show code">

```
> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
```

</Collapse>

## Blockquote with nested elements

> ## This is a header.
> 1. This is the first list item.
> 2. This is the second list item.
>
> Here's some example code:
>
>     Markdown.generate();


<Collapse title="Show code">

```
> ## This is a header.
> 1. This is the first list item.
> 2. This is the second list item.
>
> Here's some example code:
>
>     Markdown.generate();
```

</Collapse>

## Tip

<Tip>This is a tip</Tip>

<Collapse title="Show code">

```js
<Tip>This is a tip</Tip>
```

</Collapse>

## Info

<Info>This is some info</Info>

<Collapse title="Show code">

```js
<Info>This is some info</Info>
```

</Collapse>

## Warning

<Warning>This is a warning</Warning>

<Collapse title="Show code">

```js
<Warning>This is a warning</Warning>
```

</Collapse>

## Danger

<Danger>This is a danger message</Danger>

<Collapse title="Show code">

```js
<Danger>This is a danger message</Danger>
```

</Collapse>

## Highlight

You can <Highlight>highlighted text</Highlight> in a sentence!

<Collapse title="Show code">

```js
You can <Highlight>highlighted text</Highlight> in a sentence!
```

</Collapse>

## GraphQL

The GraphQL component makes it easy to demonstrate live GraphQL requests.

It's similar to the famous GraphiQL, but not as full featured. It resolves to "api.wpgraphql.com" by default, but can be passed an endpoint attribute to customize where it resolves.

<GraphQL title="GraphQL Demo Title">
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
</GraphQL>

<Collapse title="Show code">

```js
<GraphQL title="GraphQL Demo Title">
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
</GraphQL>
```

</Collapse>