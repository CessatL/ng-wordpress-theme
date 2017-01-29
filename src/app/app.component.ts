import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  settings;

  ngOnInit(){
    this.settings = (<any>window).settings;
    console.log("ya kalb");
    console.log((<any>window).settings);
  }
}
