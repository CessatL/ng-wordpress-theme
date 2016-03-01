import { Input, Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { DatePipe } from '../../pipes/date';
import { ShareCmp } from '../share/share';
import { CommentCmp } from '../disqus/disqus'

@Component({
    selector: 'post',
   // providers: [SinglePost],
    template: require('./post.html'),
    directives: [ShareCmp, CommentCmp],
    pipes: [DatePipe]
})
export class PostCmp {
    //post;
    //@Input() slug;
    //@Input() type;
    //loaded = false;  //indicate post is load in the view.
    //comments = false; //don't show disqus until scroll to bottom.
    //constructor(private _router: Router, private _service: SinglePost) {
    //}
    //ngAfterViewInit() {
    //    $('#loader')['toggleClass']('determinate indeterminate');
    //    this._service.loadPost(this.slug, this.type).subscribe(
    //        (data) => this.post = data.post,
    //        (err) => console.log(`Something went wrong: ${err.message}`),
    //        () => this.onComplete()
    //    );
    //}
    //onComplete() {
    //    $('#loader')['toggleClass']('indeterminate determinate');
    //}
    //ngAfterViewChecked(){
    //    if( !this.loaded && $('post-content')['length']){
    //        console.log('fired.');
    //        this.loaded = true;
    //
    //        // $('app')['css']('background-image', 'url('+this.post['thumbnail_images']['full']['url'] + ')');
    //        // $('post')['css']('background-image', 'url('+this.post['thumbnail_images']['full']['url'] + ')');
    //        //
    //        $('post-content img')['addClass']('materialboxed');
    //        $('.materialboxed')['materialbox']();
    //
    //    }
    //}
    //
    //onTagClick(tag) {
    //    console.log(tag + ' tag clicked.');
    //    //this._router.navigate(['Single', { slug: postSlug }]);
    //}
    //onCatClick(cat) {
    //    console.log(cat + ' category clicked.');
    //    //this._router.navigate(['Single', { slug: postSlug }]);
    //}
    //onNavClick(postUrl) {
    //    var postSlug = postUrl.split('/');
    //    postSlug = postSlug[postSlug.length - 2];
    //    this._router.navigate(['Single', { slug: postSlug }]);
    //}
}
