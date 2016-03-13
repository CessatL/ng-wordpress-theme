<?php

function register_mainmenu() {
  register_nav_menu('primary',__( 'primary' ));
}
add_action( 'init', 'register_mainmenu' );

function Initialize_Mainmenu(){
    
    //these variables will be used in the app
    wp_localize_script( 'main', 'template_directory', get_template_directory());
    wp_localize_script( 'main', 'site_url', get_bloginfo('url'));
    wp_localize_script( 'main', 'site_title', get_bloginfo('title'));
   $menu_items = wp_get_nav_menu_items('primary');
   $menu = array();
   foreach( $menu_items as $menu_item ){
       $post = get_post($menu_item->object_id);
       $item = array(
           'title' => $post->post_title,
           'slug' => $post->post_name
       );
       array_push($menu, $item);
   }
    wp_localize_script( 'main', 'main_menu', $menu);
}
//Access-Control-Allow-Origin error FIX
header("Access-Control-Allow-Origin: *");
function wpb_adding_scripts() {
   // wp_deregister_script('jquery');// removing jquery
  //  wp_enqueue_script( 'wp-api' );
    wp_register_script('polyfills', get_template_directory_uri() . '/angular/dist/polyfills.bundle.js', array(), false, true);
    wp_enqueue_script('polyfills');
    wp_register_script('vendor', get_template_directory_uri() . '/angular/dist/vendor.bundle.js', array(), false, true);
    wp_enqueue_script('vendor');
    wp_register_script('main', get_template_directory_uri() . '/angular/dist/app.bundle.js', array('vendor','wp-api'), false, true);
    wp_enqueue_script('main');
    
    Initialize_Mainmenu();
   
    // wp_register_script('chunk', get_template_directory_uri() . '/angular/dist/1.chunk.js?', array('main','polyfills'), '1.1', true);
    // wp_enqueue_script('chunk');
//    wp_register_script('browser-sync', get_template_directory_uri() . '/node_modules/browser-sync/bin/browser-sync.js', true);
//    wp_enqueue_script('browser-sync');
}
add_action( 'wp_enqueue_scripts', 'wpb_adding_scripts' );

function wpb_adding_styles() {
    
    wp_register_style( 'materiale-font','https://fonts.googleapis.com/icon?family=Material+Icons' );
    wp_enqueue_style('materiale-font');
   
    wp_enqueue_style( 'style', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'wpb_adding_styles' );


?>
