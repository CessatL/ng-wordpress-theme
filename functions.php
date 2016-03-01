<?php

//Access-Control-Allow-Origin error FIX
header("Access-Control-Allow-Origin: *");

function wpb_adding_scripts() {
    wp_enqueue_script( 'wp-api' );
    wp_register_script('polyfills', get_template_directory_uri() . '/angular/dist/polyfills.bundle.js?', '1.1', true);
    wp_enqueue_script('polyfills');
    wp_register_script('main', get_template_directory_uri() . '/angular/dist/main.bundle.js?', array('polyfills'), '1.1', true);
    wp_enqueue_script('main');
    // wp_register_script('chunk', get_template_directory_uri() . '/angular/dist/1.chunk.js?', array('main','polyfills'), '1.1', true);
    // wp_enqueue_script('chunk');
//    wp_register_script('browser-sync', get_template_directory_uri() . '/node_modules/browser-sync/bin/browser-sync.js', true);
//    wp_enqueue_script('browser-sync');
}
add_action( 'wp_enqueue_scripts', 'wpb_adding_scripts' );

function wpb_adding_styles() {
//    wp_register_style( 'materialize-font','https://fonts.googleapis.com/icon?family=Material+Icons' );
//    wp_enqueue_style('materialize-font');
    wp_enqueue_style( 'style', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'wpb_adding_styles' );


?>
