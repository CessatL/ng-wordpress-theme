/*  dropped and will be removed.
 *  WP Service using "client-js" backbone javascript client by rest api v2
 */
// import { Injectable } from 'angular2/core';
//
// @Injectable()
// export class CollectionService{
//   service;     //our service handler. (bound directly to the view)
//
//   constructor(){ }
//
//   fetch(collectionType: CollectionType, args?){
//     if(!this.service) {
//       this.service = new window['wp']['api']['collections'][collectionType]();
//     }
//     var queryArgs = {};
//     // set queryArgs
//     if(args){
//       queryArgs = {
//         data: args
//       };
//     }
//     return this.service.fetch(queryArgs);
//   }
//
//   more() {
//     //check if the service has been initialized, fetch the data
//     if(!this.service){
//       console.log("WPService: you forgot to call Initialize() first.");
//       return;
//     }
//     //get more posts (next page)
//     return this.service.more();
//   }
// }
//
// @Injectable()
// export class ModelService{
//   service;
//
//   constructor(){ }
//
//   fetch(Id , modelType: ModelType){
//
//     if(!this.service){
//       this.service = new window['wp']['api']['models'][modelType]({ id: Id});
//     }
//     return this.service.fetch();
//   }
// }
//
// export enum CollectionType{
//   /*
//   * typescript 1.8 doesn't allow string values in enums
//   * but here is a nice hack =)
//   */
//   Posts = <any>'Posts',
//   Categories = <any>'Categories',
//   Tags = <any>'Tags',
//   Users = <any>'Users',
//   Pages = <any>'Pages'
// }
//
// export enum ModelType{
//   Post = <any>'Post',
//   Category = <any>'Category',
//   Tag = <any>'Tag',
//   User = <any>'User',
//   Page = <any>'Page'
// }
//
//
// export class PostResponse{
//   /*  override post response with additional functions.  */
//   _post;
//   constructor(post) {
//     this._post = post;
//   }
//   id(){
//     return +this._post.id;
//   }
//   title(){
//     return this._post.title.rendered;
//   }
//   slug(){
//     return this._post.slug;
//   }
//   date(){
//     return this._post.date;
//   }
//   modified(){
//     return this._post.modified;
//   }
//   content(){
//     return this._post.content.rendered;
//   }
//   excerpt(){
//     return this._post.excerpt.rendered;
//   }
//   author(){
//     return this._post._embedded.author[0];
//   }
//   categories(){
//     if (this._post._embedded) {
//       return this._post._embedded['https://api.w.org/term'][0];
//     }
//   }
//   tags(){
//     if (this._post._embedded) {
//       return this._post._embedded['https://api.w.org/term'][1];
//     }
//   }
//   link(){
//     return this._post.link;
//   }
//   comments(){
//     if (this._post._embedded) {
//       return this['_embedded'].replies;
//     }
//   }
//   featuredImage(size) {
//     if (this.featuredMedia() && this._post._embedded) {
//       var featuredImage = this._post._embedded['https://api.w.org/featuredmedia'][0];
//       if(featuredImage){
//         if (featuredImage.media_details.sizes[size]) {
//           return featuredImage.media_details.sizes[size].source_url;
//         }
//         else {
//           return featuredImage.media_details.sizes['full'].source_url;
//         }
//       }
//     }
//     else
//       return 'http://www.faygoluvers.net/v5/wp-content/themes/original/images/no_image_available_s_large.jpg';
//
//   }
//   featuredMedia(){
//     return +this._post.featured_media;
//   }
// }



//import { Http } from 'angular2/http';
//import { Injectable } from 'angular2/core';
//import { Subject } from 'rxjs/Subject';
//import { Observable } from 'rxjs/Observable';
//
//@Injectable()
//export class Categories {
//    baseURL = 'http://localhost/wptest/api';
//    constructor(private http: Http) {
//    }
//    loadCats() {
//         var query = this.baseURL + '/get_category_index';
//         return this.http.get(query).map(res => res.json());
//    }
//}
//@Injectable()
//export class Tags {
//    baseURL = 'http://localhost/wptest/api';
//    constructor(private http: Http) {
//    }
//    loadTags() {
//         var query = this.baseURL + '/get_tag_index';
//         return this.http.get(query).map(res => res.json());
//    }
//}
//@Injectable()
//export class Pages {
//    baseURL = 'http://localhost/wptest/api';
//    constructor(private http: Http) {
//    }
//    loadPages() {
//         var query = this.baseURL + '/get_page_index';
//         return this.http.get(query).map(res => res.json());
//    }
//}
//
//@Injectable()
//export class Page {
//    baseURL: string = 'http://localhost/wptest/api';
//    constructor(private http: Http) {
//    }
//    loadPage(name) {
//        var query = this.baseURL + '/get_page/?page_slug=' + name;
//        return this.http.get(query).map(res => res.json());
//    }
//}
//
//@Injectable()
//export class SinglePost {
//    baseURL: string = 'http://localhost/wptest/api';
//    constructor(private http: Http) {
//    }
//    loadPost(name, post_type?) {
//        var query = this.baseURL + '/get_post?post_slug=' + name;
//        if (post_type) query += '&post_type=' + post_type;
//        return this.http.get(query).map(res => res.json());
//    }
//}
//
//@Injectable()
//export class Posts {
//    _load = new Subject<any>();
//    pagedIn: number = 1;
//    posts_per_pageIn: number = 6;
//    typeIn: string;
//    loadedPostCount;
//    totalPostCount;
//    completed;
//    posts;
//    constructor(public http: Http) {
//        this.initialize();
//    }
//    initialize() {
//        var currentPage = this._load
//            .scan(() => this.pagedIn++);
//
//        var postResponses = currentPage
//            .flatMap(() => this.fetchPosts())
//            .share();
//
//        this.posts = postResponses
//            .scan((allPosts, newPosts) => allPosts['concat'](newPosts), []);
//
//        this.loadedPostCount = this.posts.map(p => p.length);
//    }
//    fetchPosts() {
//        var query = 'http://localhost/wptest/wp-json/wp/v2/posts?&_embed&';
//        var params = [];
//        ['filter[posts_per_page]', 'filter[paged]', 'filter[post_type]'].forEach((name) => {
//            console.log(this[name.match(/\[(.*?)\]/)[1] + 'In']);
//             if (this[name.match(/\[(.*?)\]/)[1] + 'In']) params.push(name + '=' + this[name.match(/\[(.*?)\]/)[1] + 'In']);
//            });
//        query += params.join('&');
//        return this.http.get(query).map(res => res.json());
//    }
//    loadMore() {
//        this._load.next('');
//    }
//}
//
//@Injectable()
//export class SearchPosts extends Posts {
//    query: string = 'http://localhost/wptest/api/get_search_results/?';
//    _load = new Subject();
//    searchIn: string;
//    constructor(http: Http) {
//        super(http);
//        this.initialize();
//    }
//    initialize() {
//        super.initialize();
//    }
//    fetchPosts() {
//        var params = [];
//        ['count', 'page', 'post_type', 'search'].forEach((name) => {
//            if (this[name + 'In']) params.push(name + '=' + this[name + 'In']); });
//        this.query += params.join('&');
//        return this.http.get(this.query).map(res => res.json());
//    }
//}
//
//@Injectable()
//export class CatPosts extends Posts {
//    query: string = 'http://localhost/wptest/api/core/get_category_posts/?';
//    _load = new Subject();
//    slugIn: string;             //category slug
//    constructor(http: Http) {
//        super(http);
//        this.initialize();
//    }
//    initialize() {
//        super.initialize();
//    }
//    fetchPosts() {
//        var params = [];
//        ['count', 'page', 'post_type', 'slug'].forEach((name) => {
//            if (this[name + 'In']) params.push(name + '=' + this[name + 'In']); });
//        this.query += params.join('&');
//        return this.http.get(this.query).map(res => res.json());
//    }
//}
//
//@Injectable()
//export class TagPosts extends Posts {
//    query: string = 'http://localhost/wptest/api/get_tag_posts/?';
//    _load = new Subject();
//    tag_slugIn: string;             //category slug
//    constructor(http: Http) {
//        super(http);
//        this.initialize();
//    }
//    initialize() {
//        super.initialize();
//    }
//    fetchPosts() {
//        var params = [];
//        ['count', 'page', 'post_type', 'tag_slug'].forEach((name) => {
//            if (this[name + 'In']) params.push(name + '=' + this[name + 'In']); });
//        this.query += params.join('&');
//        return this.http.get(this.query).map(res => res.json());
//    }
//}
