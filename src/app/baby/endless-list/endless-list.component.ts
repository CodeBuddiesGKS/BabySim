import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/Rx";
import { ListItem } from '../../core/models/list-item';
import { ObjectListItems } from '../../core/models/object-list-items';

@Component({
  selector: 'endless-list',
  templateUrl: './endless-list.component.html'
})
export class EndlessListComponent implements OnInit {
  
  protected items: ObjectListItems = new ObjectListItems();
  private scrollItems: ListItem[] = [];
  private indices: any;

  constructor(private http: Http) { }

    //at init time we only need the length
    ngOnInit() {
        this.http.get('assets/items.json')
        .map(response => response.json()).toPromise()
        .then(data => this.items.length = data.length);
    }

    //fired when scrolling
    onUpdate(event) {
        let start = event.start;
        let end = event.end;

        this.http.get('assets/items.json')
        .map(response => response.json()).toPromise()
        .then(data => this.scrollItems = data.slice(start, end));
    }
}