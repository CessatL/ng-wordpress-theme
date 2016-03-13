import { Injectable } from 'angular2/core';

export class WPService{
  // our handler for wp-api client.
  results;
  service;
  embed = false;

  constructor(){
  }
  Initialize(collectionType: CollectionType){
    //Initialize the service
    if(collectionType == CollectionType.Posts)
      this.service = new window['wp']['api']['collections']['Posts']();
    else if(collectionType == CollectionType.Categories)
      this.service = new window['wp']['api']['collections']['Categories']();
    else if(collectionType == CollectionType.Tags)
      this.service = new window['wp']['api']['collections']['Tags']();
    else if(collectionType == CollectionType.Users)
      this.service = new window['wp']['api']['collections']['Users']();
    else if(collectionType == CollectionType.Pages)
      this.service = new window['wp']['api']['collections']['Pages']();
    else
      console.log("CollectionService: wrong collection type");
  }
}

@Injectable()
export class CollectionService extends WPService{

  constructor(){ super()}

  Initialize(collectionType: CollectionType) {
    super.Initialize(collectionType);
  }

  fetch(args?){
    //Initializing collection query
    if(args)
      this.embed = args._embed;
    var queryArgs = {
      data: args
    };
    if(this.service){
      //check if the service has been initialized, fetch the data
      this.service.fetch(queryArgs).done((response) => {
        this.results = this.embed ? PostsCollection(response) : response;
      });
    }
    else{
      console.log("WPService: you forgot to call Initialize() first.")
    }
  }

  more() {
    this.service.more().done((response) => {
      this.results = this.results.concat(this.embed ? PostsCollection(response) : response);
    });
  }
}

@Injectable()
export class SingleService extends WPService{

  constructor(){ super() }

  Initialize(collectionType: CollectionType) {
    super.Initialize(collectionType);
  }
  fetch(args?){
    //Initializing collection query
    if(args)
      this.embed = args._embed;
    var queryArgs = {
      data: args
    };

    if(this.service) {
      //check if the service has been initialized, fetch the data

      this.service.fetch(queryArgs).done((response) => {
        this.results = this.embed ? SinglePost(response[0]): response[0];
      });
    }
    else{
      console.log("WPService: you forgot to call Initialize() first.")
    }
  }
}

export enum CollectionType{
  Posts,
  Categories,
  Tags,
  Users,
  Pages
}

export function PostsCollection(posts) {
  var results: Array<PostResponse> = [];
  for (var post of posts) {
    results.push(SinglePost(post));
  }
  return results;
}
export function SinglePost(post){
  /* due to the weird attributes names provided by the official wp rest api v2.
   post._embedded['https://api.w.org/term'][0] : represents the categories of the posts.
   post._embedded['https://api.w.org/term'][1] : represents the tags of the posts.
   post._embedded['https://api.w.org/featuredmedia'][0] : represents the featured image.*/

  var postResponse:PostResponse;
  postResponse = post;
  postResponse.categories = post._embedded['https://api.w.org/term'][0];
  postResponse.tags = post._embedded['https://api.w.org/term'][1];

  /* check if the post has featured image && check if it has a medium size */
  if (post._embedded.hasOwnProperty('https://api.w.org/featuredmedia')
    && post._embedded['https://api.w.org/featuredmedia'][0].media_details.sizes.hasOwnProperty('medium')) {

    postResponse.featuredImage = post._embedded['https://api.w.org/featuredmedia'][0].media_details.sizes.medium.source_url;
  }

  return postResponse;
}

export class PostResponse{
  /*
   PostResponse will hold all post attributes,
   only used for embedded posts.
   */
  featuredImage : string;
  categories: Array<any>;
  tags: Array<any>;
  constructor() { }
}



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
