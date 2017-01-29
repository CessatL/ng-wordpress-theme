# ng-wordpress-theme
Angular + Wordpress starter theme

This is an old [demo](http://ng2wordpress-murhaf.rhcloud.com) but things have been changed now

# This repo is still an expierment for integrating angular app in a wordpress theme. contributions are extremely welcome :)

#### Requirement:

  - local WordPress server. (You can get one from [here](https://bitnami.com/stack/wordpress))

#### Quick start

  - Download this repo into WP theme folder
  - Navigate into the new theme and `npm install`
  - `ng build` to get the `dist` directory
  - Open your browser and go to wordpress server, e.g.: `http://localhost/wordpress`

##Ideas for the theme

 - `ngrx/store` for app state

```
   {
     menu: [],
     categories: [],
     config: {
       thumbnail_size,
       featured_size,
       posts_per_page,
       theme_class
     },
     routes:[
       {
         name: "posts",
          path: "/posts",
          lazy: false
       },
       {
         name: "pages",
          path: "/pages",
          lazy: false
       },
       {
          name: "projects",
          path: "/projects",
          lazy: true
       }
     ]
   }
```

This state is initialized from **function.php** using `wp_localize_script` function, so it can be accessed later in angular using a service

##TODOs:

 - Dynamic angular routes:
   
   This can be a great feature to allow users to specify angular routes from there theme config at WP setting page

 - Use [Angular WordPress Module](https://github.com/MurhafSousli/ng2-wp-api) to make things requests easy.
