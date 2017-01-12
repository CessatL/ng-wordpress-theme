# ng-wordpress-theme
Angular + Wordpress starter theme

This is an old [demo](http://ng2wordpress-murhaf.rhcloud.com) but things have been changed now

# This repo is still an expierment for integrating angular app in a wordpress theme. contributions are extremely welcome :)

#### Requirement:

  - Local Wordpress server ready.
  - WP REST API v2 plugin activated.


I need community help to solve the following:

##Challenges:

###Meta tags (Important):
     
**Problem:** Most web crawlers do NOT support AJAX sites at the moment.

**Possible solution:**

Create WP plugin to check if a web crawler is trying to retrieve the URL, then it returns a static HTML contains only the meta tags of that post otherwise load the angular app

A web crawler response should look something like this:
```html
<html prefix="og: http://ogp.me/ns#">
<head>
  <title>Current Post Title</title>
  <meta name="description" content="Free WordPress Theme">
  <meta property="og:title" content="Current Post Title"/>
  <meta property="og:description" content="Free WordPress Theme" />
  <meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />
</head>
</html>
```

##One workflow:

Whether we use webpack or gulp or both, we should be able to implement a workflow that

 - builds our angular app for development and production (like any angular starter)
 - Configures enqueued scripts names in `function.php` to match scripts names in production.
 - Serves from WP Server and refresh page on changes in development.

##Ideas for the theme

 - Our app will use single state, like:

```
   {
     app_name: 'My WordPress App',
     menu: [],
     categories: [],
     config: {
       thumbnail_size,
       featured_size,
       posts_per_page,
       theme_class
     },
     endpoints:[
       "projects",
       "courses"
     ]
   }
```
This state should be initialized from **function.php** using `wp_localize_script` function, so it can be accessed later in angular using a service
  
 - Branches for bootstrap, material...
