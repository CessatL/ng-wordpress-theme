import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {AppState} from '../../app.service';

/*
 *  WP Collections Service
 */
@Injectable()
export class WPCollections {

  baseURL;
  //query arguments.
  args;
  //collection paginatation properties
  currentPage = 1;
  totalPages = 1;
  totalObjects = 0;

  constructor(private http:Http, endpoint:WPEndpoint, appState:AppState) {
    //Get base url from app config and endpoint
    this.baseURL = appState.get('config').site_url + endpoint;
  }

  /*
   * fetch() : request the collection
   */
  fetch(args?) {
    //set our args if possible
    this.args = args;
    //generateUrl returns the final URL.
    return this.http.get(this.generateUrl()).map(
      res => {
        //set our totalObject and totalPages from res headers
        this.totalObjects = +res.headers.get('X-WP-Total');
        this.totalPages = +res.headers.get('X-WP-TotalPages');
        //return our json data.
        return res.json();
      },
      err => console.log('[WPService]: fetch collection error:' + err)
    );
  }

  /*
   * more() : request next page of the collection if it is available
   */
  more() {
    if (this.hasMore()) {
      //increment our currentPage then assign it to our args.
      this.args.page = ++this.currentPage;

      return this.http.get(this.generateUrl()).map(
        res => {
          //set our totalObject and totalPages from res headers
          this.totalObjects = +res.headers.get('X-WP-Total');
          this.totalPages = +res.headers.get('X-WP-TotalPages');
          //return our json data.
          return res.json();
        },
        err => console.log('[WPService]: more collection error:' + err)
      );
    }
  }

  /*
   *  hasMore() : return true if the next page of the collection is available
   */
  hasMore() {
    return (this.currentPage < this.totalPages);
  }

  /*
   * generateUrl returns the final URL with arguments.
   */
  generateUrl() {
    var url = this.baseURL;
    if (this.args) {
      //add args to baseURL
      url += '?' + serialize(this.args);
      //assign currentPage to args.page otherwise to 1
      this.currentPage = (this.args.page) ? +this.args.page : 1;
    }
    console.log('[WPService]: Fetching collection: ' + url);
    return url;
  }
}
/*
 *  WP Models Service
 */
@Injectable()
export class WPModels {

  baseURL;

  constructor(private http:Http, endpoint:WPEndpoint, appState:AppState) {
    //Get base url from app config and endpoint
    this.baseURL = appState.get('config').site_url + endpoint;
  }

  fetch(id:number, args?) {
    //set the URL with the object id.
    var url = this.baseURL + '/' + id;
    //add args to the url if available
    if (args) url += '?' + serialize(args);
    console.log('[WPService]: Fetching model: ' + url);
    return this.http.get(url).map(
      res => res.json(),
      err => console.log('[WPService]: fetch model error:' + err)
    );
  }
}
/*
 *  Available WP REST endpoints
 */
export enum WPEndpoint{
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

/*
 *  Serialize our URL parameters.
 */
var serialize = function (obj, prefix?) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
      encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

/*
 *  Post model
 */
export class PostResponse {
  /*  override post response with additional functions.  */
  _post;

  constructor(post) {
    this._post = post;
  }

  id() {
    return +this._post.id;
  }

  title() {
    return this._post.title.rendered;
  }

  slug() {
    return this._post.slug;
  }

  date() {
    return this._post.date;
  }

  modified() {
    return this._post.modified;
  }

  content() {
    return this._post.content.rendered;
  }

  excerpt() {
    return this._post.excerpt.rendered;
  }

  author() {
    return this._post._embedded.author[0];
  }

  categories() {
    if (this._post._embedded) {
      return this._post._embedded['https://api.w.org/term'][0];
    }
  }

  tags() {
    if (this._post._embedded) {
      return this._post._embedded['https://api.w.org/term'][1];
    }
  }

  link() {
    return this._post.link;
  }

  comments() {
    if (this._post._embedded) {
      return this['_embedded'].replies;
    }
  }

  featuredImage(size) {
    if (this.featuredMedia() && this._post._embedded) {
      var featuredImage = this._post._embedded['https://api.w.org/featuredmedia'][0];
      if (featuredImage) {
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

  featuredMedia() {
    return +this._post.featured_media;
  }
}

