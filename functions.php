<?php

function custom_theme_setup() {
    
    add_theme_support( 'menus' );
}
add_action( 'after_setup_theme', 'custom_theme_setup' );

function register_mainmenu() {
    /*
    *   register and return mainmenu;
    */
    $menu_items = wp_get_nav_menu_items('primary');
    $menu = array();
    foreach( $menu_items as $menu_item ){
        $menutype = $menu_item->type_label;
            $item_slug;
        if($menutype === "Post" || $menutype  === "Page"){
            $item_slug = get_post($menu_item->object_id)->post_name;
        }
        else if($menutype == "Category"){
            $item_slug = get_category($menu_item->object_id)->slug;
        }
     
     $item = array(
         'title' => $menu_item->title,
         'slug' =>  $item_slug,
         'type' =>  $menutype,
         'url' =>   $menu_item->url
        );
     array_push($menu, $item);
     }
    return $menu;
    //return $menu_items;
}

function register_Config(){
    /*
    * add our configuration to the main script.
    */
    $config = array(
        'template_directory' => get_template_directory(),
        'site_url' => get_option('siteurl'),
        'site_title' => get_option('blogname'),
        'site_description' => get_option('blogdescription'),
        'home_id' => get_option('page_on_front'),
        'blog_id' => get_option('page_for_posts'),
        'admin_email' => get_option('admin_email'),
        'menu' => register_mainmenu()
    );
    wp_localize_script( 'main', 'app_config', $config);
}

//Access-Control-Allow-Origin to FIX wp rest api error
header("Access-Control-Allow-Origin: *");


function wpb_adding_scripts() {
    
    wp_deregister_script('jquery');
    wp_deregister_script('wp-api');
    //echo wp_script_is('wp-api', 'registered');
    
    // $handle = 'wp-api.js';
    // $list = 'enqueued';
    //  if (wp_script_is( $handle, $list )) {
    //    return;
    
    //if () ) {
        // Use minified scripts if SCRIPT_DEBUG is not on.
        // $suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

        // wp_register_script( 'wp-api', plugins_url( 'wp-api' . $suffix . '.js', __FILE__ ), array(), '1.1', true );

        // $settings = array(
        //     'root'          => esc_url_raw( get_rest_url() ),
        //     'nonce'         => wp_create_nonce( 'wp_rest' ),
        //     'versionString' => 'wp/v2/',
        // );
        // wp_localize_script( 'main', 'wpApiSettings', $settings );
   // }
    
    // wp_register_script('wp-api-client', get_template_directory_uri() . '/angular/dist/assets/wp-api.js', array('jquery'),false, true);
    // wp_enqueue_script('wp-api-client');
    wp_register_script('polyfills', get_template_directory_uri() . '/angular/dist/polyfills.bundle.js', array(), false, true);
    wp_enqueue_script('polyfills');
    wp_register_script('vendor', get_template_directory_uri() . '/angular/dist/vendor.bundle.js', array(), false, true);
    wp_enqueue_script('vendor');
    wp_register_script('main', get_template_directory_uri() . '/angular/dist/main.bundle.js', array('vendor'), false, true);
    register_Config();
    wp_enqueue_script('main');
}
add_action( 'wp_enqueue_scripts', 'wpb_adding_scripts' );

function wpb_adding_styles() {
    
    wp_register_style( 'materiale-font','https://fonts.googleapis.com/icon?family=Material+Icons' );
    wp_enqueue_style('materiale-font');
   
    wp_enqueue_style( 'style', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'wpb_adding_styles' );


?>
