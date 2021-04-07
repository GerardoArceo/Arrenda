import { OnDestroy, OnInit, Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  template: ''
})
export class BaseComponent implements OnInit, OnDestroy {

  Subscriptions: Array<Subscription> = new Array<Subscription>();
  temporalSubscription: Subscription;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.Subscriptions.length > 0) {
      this.Subscriptions.forEach(element => {
        element.unsubscribe();
      });
    }
  }

}
