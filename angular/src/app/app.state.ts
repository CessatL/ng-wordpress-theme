import "rxjs/add/operator/share";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Injectable} from "angular2/core";

@Injectable()
export class AppStateService {
  state:boolean = false;
  state$:Observable<boolean>;
  private stateObserver:Observer<boolean>;

  constructor() {
    this.state$ = new Observable(observer => this.stateObserver = observer).share();
  }

  updateState(newState) {
    this.state = newState;
    this.stateObserver.next(newState);
  }
}
