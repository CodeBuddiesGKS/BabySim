import { ListItem } from './list-item';
import { ObjectList } from '../../shared/virtual-scroll/virtual-scroll.component';

export class ObjectListItems extends ObjectList<ListItem>{
    length = 0;
    indexOf(elem: ListItem) { return elem.index; }

    constructor(length?: number){
        super();
        if (length) this.length = length;
    }
}