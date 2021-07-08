import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { DragItem } from 'src/app/types/DragItem';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css'],
})
export class DragAndDropComponent implements OnInit {
  @Input() type: string = '';
  @Input() methodName = '';
  items: DragItem[] = [];
  selectedItems: DragItem[] = [];
  searchInput = new FormControl('');
  page: number = 1;
  pageSize: number = 10;

  constructor(private booksService: BookService) {}

  ngOnInit(): void {
    this.booksService
      .getData(this.methodName)
      .subscribe((response: DragItem[]) => (this.items = response));
  }

  onItemsDblClick(item: DragItem) {
    let result = this.items.filter((e) => e.id !== item.id);
    this.items = result;
    this.selectedItems.push(item);
  }

  onSelectedItemsDblClick(item: DragItem) {
    let result = this.selectedItems.filter((e) => e.id !== item.id);
    this.selectedItems = result;
    this.items.push(item);
  }

  onSearchChange(event: InputEvent) {
    if (this.searchInput.value != '') {
      this.items = this.items.filter((e) =>
        e.name.toLowerCase().match(this.searchInput.value.toLowerCase())
      );
    } else if (this.searchInput.value == '') {
      this.ngOnInit();
    }
  }

  deleteClick(selectedItem: DragItem) {
    let result = this.selectedItems.filter((e) => e.id !== selectedItem.id);
    this.selectedItems = result;
    this.items.push(selectedItem);
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
