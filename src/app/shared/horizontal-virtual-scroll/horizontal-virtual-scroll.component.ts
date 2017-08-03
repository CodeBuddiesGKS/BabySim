import { Component, ElementRef, EventEmitter, Input, NgModule, OnChanges, OnDestroy, OnInit, Output, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChangeEvent {
    start?: number;
    end?: number;
}

export abstract class ObjectList<T> {
    abstract indexOf(item:T) : number;
    abstract length: number;
}

@Component({
    selector: 'horizontal-virtual-scroll',
    templateUrl: 'horizontal-virtual-scroll.component.html',
    styleUrls: ['horizontal-virtual-scroll.component.css']
})
export class HorizontalVirtualScrollComponent<T> implements OnInit, OnDestroy, OnChanges {

    @Input() items: ObjectList<T> = [];
    @Input() scrollbarWidth: number;
    @Input() scrollbarHeight: number;
    @Input() childWidth: number;
    @Input() childHeight: number;

    @Output() update: EventEmitter<ChangeEvent> = new EventEmitter<ChangeEvent>();
    @Output() change: EventEmitter<ChangeEvent> = new EventEmitter<ChangeEvent>();
    @Output() start: EventEmitter<ChangeEvent> = new EventEmitter<ChangeEvent>();
    @Output() end: EventEmitter<ChangeEvent> = new EventEmitter<ChangeEvent>();

    @ViewChild('content', { read: ElementRef })
    contentElementRef: ElementRef;

    private onScrollListener: Function;
    private leftPadding: number;
    private scrollHeight: number;
    private scrollWidth: number;
    private previousStart: number;
    private previousEnd: number;
    private startupLoop: boolean = true;

    constructor(private element: ElementRef,
                private renderer: Renderer) {}

    ngOnInit() {
        this.onScrollListener = this.renderer.listen(this.element.nativeElement, 'scroll', this.refresh.bind(this));
        this.scrollbarWidth = 0;
        this.scrollbarHeight = 0;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.previousStart = undefined;
        this.previousEnd = undefined;
        this.refresh();
    }

    ngOnDestroy() {
        this.onScrollListener();
    }

    refresh() {
        requestAnimationFrame(this.calculateItems.bind(this));
    }

    private countItemsPerRow() {
        let offsetLeft;
        let itemsPerRow;
        let children = this.contentElementRef.nativeElement.children;
        for (itemsPerRow = 0; itemsPerRow < children.length; itemsPerRow++) {
            if (offsetLeft != undefined && offsetLeft !== children[itemsPerRow].offsetLeft) break;
            offsetLeft = children[itemsPerRow].offsetLeft;
        }
        return itemsPerRow;
    }

    private calculateDimensions() {
        let el = this.element.nativeElement;
        let content = this.contentElementRef.nativeElement;

        let items = this.items || [];
        let itemCount = items.length;
        let viewWidth = el.clientWidth - this.scrollbarWidth;
        let viewHeight = el.clientHeight - this.scrollbarHeight;

        let contentDimensions;
        if (this.childWidth == undefined || this.childHeight == undefined) {
            contentDimensions = content.children[0] ? content.children[0].getBoundingClientRect() : {
                width: viewWidth,
                height: viewHeight
            };
        }
        let childWidth = this.childWidth || contentDimensions.width;
        let childHeight = this.childHeight || contentDimensions.height;

        let itemsPerRow = Math.max(1, Math.floor(viewWidth / childWidth));
        let itemsPerCol = 1;

        return {
            itemCount: itemCount,
            viewWidth: viewWidth,
            viewHeight: viewHeight,
            childWidth: childWidth,
            childHeight: childHeight,
            itemsPerRow: itemsPerRow,
            itemsPerCol: itemsPerCol,
        };
    }

    private calculateItems() {
        let el = this.element.nativeElement;

        let d = this.calculateDimensions();
        let items = this.items || [];

        this.scrollWidth = d.childWidth * d.itemCount / d.itemsPerCol;
        if (this.element.nativeElement.scrollLeft > this.scrollWidth) {
            this.element.nativeElement.scrollLeft = this.scrollWidth;
        }

        let indexByScrollLeft = el.scrollLeft / this.scrollWidth * d.itemCount / d.itemsPerCol;
        let end = Math.min(d.itemCount, Math.ceil(indexByScrollLeft) * d.itemsPerCol + d.itemsPerCol * (d.itemsPerRow + 1));
        let maxStart = Math.max(0, end - d.itemsPerRow * d.itemsPerCol - d.itemsPerCol);
        let start = Math.min(maxStart, Math.floor(indexByScrollLeft) * d.itemsPerCol);

        this.leftPadding = d.childWidth * Math.ceil(start / d.itemsPerCol);
        if (start !== this.previousStart || end !== this.previousEnd) {
            // update the scroll list
            this.update.emit({ start, end });
            // emit 'start' event
            if (start !== this.previousStart && this.startupLoop === false) {
                this.start.emit({ start, end });
            }
            // emit 'end' event
            if (end !== this.previousEnd && this.startupLoop === false) {
                this.end.emit({ start, end });
            }

            this.previousStart = start;
            this.previousEnd = end;

            if (this.startupLoop === true) {
                this.refresh();
            } else {
                this.change.emit({ start, end });
            }
        } else if (this.startupLoop === true) {
            this.startupLoop = false;
            this.refresh();
        }
    }
}