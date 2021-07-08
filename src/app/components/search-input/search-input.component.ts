import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
})
export class SearchInputComponent implements OnInit {
  @Input() searchInput: FormControl = new FormControl();
  @Input() type: string = '';
  @Output() onChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSearchChange(event: InputEvent) {
    this.onChange.emit(event);
  }
}
