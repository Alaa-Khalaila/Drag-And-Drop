import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { DragItem } from 'src/app/types/DragItem';

@Component({
  selector: 'app-drag-and-drop-item',
  templateUrl: './drag-and-drop-item.component.html',
  styleUrls: ['./drag-and-drop-item.component.css'],
})
export class DragAndDropItemComponent implements OnInit {
  @Input() item: DragItem = { id: 0, name: '', price: 0 };
  @Input() selectedItem: DragItem = { id: 0, name: '', price: 0 };
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.btnClick.emit();
  }
}
