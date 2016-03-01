import { Input, Component } from 'angular2/core';
import { Location, Router } from 'angular2/router';

@Component({
	selector: 'disqus',
	template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>'
})
export class CommentCmp {
	
	//input properties
	@Input()
	disqus_shortname;
    
 	@Input()
	disqus_title;
    
	disqus_url = document.URL;
	disqus_identifier;
	
	constructor(location: Location) {
        if(!this.disqus_title){
            this.disqus_title = document.title;
        }
        this.disqus_identifier = '#!' + location.path();
	}
	ngOnInit() {	
		if (typeof this.disqus_identifier === 'undefined' || typeof this.disqus_url === 'undefined') {
			throw "Please ensure that the `disqus-identifier` and `disqus-url` attributes are both set.";
		}
		
		//if not loaded before, load it
		if (!window['DISQUS']) {
			var id = this.disqus_identifier;
			var url = this.disqus_url;
			window['disqus_config'] =  function () {
				this.language = 'en';
				this.page.url = url; 
				this.page.identifier = id; 
			};
			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
			dsq.src = '//' + this.disqus_shortname + '.disqus.com/embed.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	
		}
		
		//if Disqus is already loaded, just reset it with new id and url.
		else{
			var id = this.disqus_identifier;
			var url = this.disqus_url;
			window['DISQUS'].reset({
				reload: true,
				config: function () {  
					this.page.identifier = id;  
					this.page.url = url;
				}
			});
		}
	}

}