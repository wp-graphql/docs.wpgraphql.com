# WPGraphQL.com

This is the (soon to be) website for the WPGraphQL WordPress plugin (https://wpgraphql.com). 

This site is built with Gatsby JS. 

## Running locally

- Clone this repo
- Make sure you have Gatsby CLI installed (`npm install --global gatsby-cli`)
- Run site locally: Inside the repo directory run `gatsby develop`

## Structure

- **gatsby-config.js:** The config for the Gatsby site. This sets up the plugins and other basic site config.
- **gatsby-node.js:** This file hooks into the Gatsby build process to generate the the pages from markdown files, index to Algolia, etc.
- `src/`: This directory contains the meat of the site.
- `src/docs`: The Markdown files used to generate

