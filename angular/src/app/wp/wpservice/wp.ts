import { Injectable } from 'angular2/core';
import {Http} from 'angular2/http';
import {AppState} from '../../app.service';


@Injectable()
export class WPCollections{

  baseURL;
  args;
  currentPage;
  totalPages;
  totalObjects;

  constructor(private http: Http, endpoint: WPEnpoint, appState: AppState){
    this.baseURL = appState.get().config.site_url + endpoint;
    this.currentPage = 1;
    this.totalPages = 1;
    this.totalObjects = 0;
  }
  fetch(args?){
    this.args = args;

    return this.http.get(this.generateUrl()).map(res => {
      this.totalObjects = +res.headers.get('X-WP-Total');
      this.totalPages = +res.headers.get('X-WP-TotalPages');
      return res.json();
    });
  }
  more(){
    if(this.hasMore()){
      this.args.page = ++this.currentPage;
      return this.http.get(this.generateUrl()).map(res => {
        this.totalObjects = +res.headers.get('X-WP-Total');
        this.totalPages = +res.headers.get('X-WP-TotalPages');
        return res.json();
      });
    }
  }
  hasMore(){
    return (this.currentPage < this.totalPages);
  }
  generateUrl(){
    var url = this.baseURL;
    if(this.args){
      url += '?' + serialize(this.args);
      this.currentPage = (this.args.page) ? +this.args.page : 1;
    }
    console.log("Fetch Collection: " + url);
    return url;
  }
}

@Injectable()
export class WPModels{

  baseURL;

  constructor(private http: Http, endpoint: WPEnpoint, appState: AppState){
    this.baseURL = appState.get('config').site_url + endpoint;
  }
  fetch(id: number, args?){
    var url = this.baseURL + '/' + id;
    if(args) url += '?' + serialize(args);
    console.log("Fetch Model: " + url);
    return this.http.get(url).map(res => res.json());
  }
}

export enum WPEnpoint{
  Posts = <any>'/wp-json/wp/v2/posts',
  Pages = <any>'/wp-json/wp/v2/pages',
  Media = <any>'/wp-json/wp/v2/media',
  Types = <any>'/wp-json/wp/v2/types',
  Statuses = <any> '/wp-json/wp/v2/statuses',
  Comments = <any> '/wp-json/wp/v2/comments',
  Categories = <any>'/wp-json/wp/v2/categories',
  Tags = <any>'/wp-json/wp/v2/tags',
  Users = <any>'/wp-json/wp/v2/users',
}

var serialize = function (obj, prefix?) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
      encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}


export class PostResponse{
  /*  override post response with additional functions.  */
  _post;
  constructor(post) {
    this._post = post;
  }
  id(){
    return +this._post.id;
  }
  title(){
    return this._post.title.rendered;
  }
  slug(){
    return this._post.slug;
  }
  date(){
    return this._post.date;
  }
  modified(){
    return this._post.modified;
  }
  content(){
    return this._post.content.rendered;
  }
  excerpt(){
    return this._post.excerpt.rendered;
  }
  author(){
    return this._post._embedded.author[0];
  }
  categories(){
    if (this._post._embedded) {
      return this._post._embedded['https://api.w.org/term'][0];
    }
  }
  tags(){
    if (this._post._embedded) {
      return this._post._embedded['https://api.w.org/term'][1];
    }
  }
  link(){
    return this._post.link;
  }
  comments(){
    if (this._post._embedded) {
      return this['_embedded'].replies;
    }
  }
  featuredImage(size) {
    if (this.featuredMedia() && this._post._embedded) {
      var featuredImage = this._post._embedded['https://api.w.org/featuredmedia'][0];
      if(featuredImage){
        if (featuredImage.media_details.sizes[size]) {
          return featuredImage.media_details.sizes[size].source_url;
        }
        else {
          return featuredImage.media_details.sizes['full'].source_url;
        }
      }
    }
    else
      return 'http://www.faygoluvers.net/v5/wp-content/themes/original/images/no_image_available_s_large.jpg';

  }
  featuredMedia(){
    return +this._post.featured_media;
  }
}
