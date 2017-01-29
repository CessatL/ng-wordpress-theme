<?php

require_once('functions/robots.php');
require_once('functions/config.php');

//Tempurary for development
header("Access-Control-Allow-Origin: *");

function ng_theme_setup()
{
    add_theme_support('menus');
}
add_action('after_setup_theme', 'ng_theme_setup');

function wpb_adding_scripts()
{
    wp_deregister_script('jquery');
    wp_deregister_script('wp-api');

    wp_register_script('inline', get_template_directory_uri() . '/dist/inline.bundle.js', array(), false, true);
    wp_register_script('vendor', get_template_directory_uri() . '/dist/vendor.bundle.js', array(), false, true);
    wp_register_script('main', get_template_directory_uri() . '/dist/main.bundle.js', array(), false, true);

    //Push WP settings to the app
    $appSettings = array(
        'menu' => array("home","blog","about"),
        'categories' => array("news","sports","technology"),
        'routes' => array(
            array(
                "name" => "Posts",
                "path" => "/posts"
            ),
        ),
        'config' => array(
            'thumbnail_size' => "",
            'featured_size' => "",
            'posts_per_page' => "",
            'theme_class' => ""
        ),
    );
    wp_localize_script( 'inline', 'settings', $appSettings );

    wp_enqueue_script('inline');
    wp_enqueue_script('vendor');
    wp_enqueue_script('main');

    wp_localize_script( $handle, $name, $data ); 
}
add_action('wp_enqueue_scripts', 'wpb_adding_scripts');

function wpb_adding_styles()
{
    wp_enqueue_style('style', get_template_directory_uri(). '/dist/styles.bundle.css');
}
add_action('wp_enqueue_scripts', 'wpb_adding_styles');


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
?>