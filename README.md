# ng-wordpress-theme
Angular + Wordpress starter theme

This is an old [demo](http://ng2wordpress-murhaf.rhcloud.com) but things have been changed now

# This repo is still an expierment for integrating angular app in a wordpress theme. contributions are extremely welcome :)

#### Requirement:

  - Local Wordpress server ready.
  - WP REST API v2 plugin activated.

####Possible ideas:

 #### Use single state for the app

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
State is initialized from **function.php** using `wp_localize_script` function, so it can be accessed later in angular using a service

Advantages:

 - Get the global variables can include, main menu, header, sidebar, footer
 - Useful for getting theme configuration e.g. theme-colors or header height...
  
