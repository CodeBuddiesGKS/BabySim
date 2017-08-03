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
  protected items2: ObjectListItems = new ObjectListItems();
  private data: any;
  private scrollItems: ListItem[] = [];
  private scrollItems2: ListItem[] = [];
  private indices: any;
  private indices2: any;

  constructor(private http: Http) { }

    //at init time we only need the length
    ngOnInit() {
        this.http.get('assets/items.json')
        .map(response => response.json()).toPromise()
        .then(data => {
            this.items.length = data.length;
            this.items2.length = data.length;
            this.data = data;
        });
    }

    //fired when scrolling
    onUpdate(event, virtualScroll: number) {
        let start = event.start;
        let end = event.end;

        if (this.data) {
            if (virtualScroll == 0) {
                this.scrollItems = this.data.slice(start, end);
            } else {
                this.scrollItems2 = this.data.slice(start, end);
            }
        }
    }
}