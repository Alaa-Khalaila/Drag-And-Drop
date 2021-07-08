import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragAndDropComponent } from './drag-and-drop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderComponent } from '../header/header.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { DragItem } from 'src/app/types/DragItem';
import { BookService } from 'src/app/services/book.service';

describe('DragAndDropComponent', () => {
  let component: DragAndDropComponent;
  let fixture: ComponentFixture<DragAndDropComponent>;
  let testServiceStub: any;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [DragDropModule],
    })
  );

  beforeEach(async () => {
    testServiceStub = {
      getData(): Observable<DragItem[]> {
        return of([{ id: 1, name: 'alaa', price: 13123 }]);
      },
    };
    await TestBed.configureTestingModule({
      declarations: [
        DragAndDropComponent,
        HeaderComponent,
        SearchInputComponent,
      ],
      imports: [ReactiveFormsModule, NgbModule],
      providers: [{ provide: BookService, useValue: testServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain two lists', () => {
    const h2Elements = fixture.debugElement.queryAll(
      By.css('[test-drag-list]')
    );
    expect(h2Elements.length == 2).toBeTrue();
  });

  it('should contain h2 tag', () => {
    const h2Ele: HTMLHeadElement = fixture.debugElement.query(
      By.css('#h2-test')
    ).nativeElement;
    expect(h2Ele.textContent).toContain('Available');
  });

  it('should show no drag-item when there is no items', () => {
    component.items = [];
    fixture.detectChanges();

    const item = fixture.debugElement.queryAll(By.css('[test-drag-item]'));
    expect(item.length).toBe(0);
  });

  describe('onItemDblClick', () => {
    it('should move the item from items to selected items', () => {
      let item = { id: 1232, name: 'asdasd', price: 124124 };
      component.items = [item];

      component.onItemsDblClick(item);

      expect(component.selectedItems).toContain(item);
      expect(component.items).not.toContain(item);
    });
  });

  describe('onSelectedItemsDblClick', () => {
    it('should move the item from selectedItems to items', () => {
      let item = { id: 1232, name: 'asdasd', price: 124124 };
      component.selectedItems = [item];

      component.onSelectedItemsDblClick(item);

      expect(component.items).toContain(item);
      expect(component.selectedItems).not.toContain(item);
    });
  });

  describe('onSearchChange', () => {
    it('should filter the items and keep this item', () => {
      let item = { id: 1232, name: 'alaa', price: 124124 };
      component.items = [item];

      component.searchInput.setValue('alaa');

      expect(component.items).toContain(item);
    });

    it('should filter the items and remove this item', () => {
      let item = { id: 1232, name: 'alaa', price: 124124 };
      component.items = [item];

      component.searchInput.setValue('alaa1');

      expect(component.items).not.toContain(item);
    });
  });

  describe('deleteClick', () => {
    it('should remove item from selected items and set it back to items', () => {
      let selectedItem = { id: 1232, name: 'alaa', price: 124124 };
      component.selectedItems = [selectedItem];

      component.deleteClick(selectedItem);

      expect(component.items).toContain(selectedItem);
      expect(component.selectedItems).not.toContain(selectedItem);
    });
  });

  describe('drop', () => {
    it('should move from items to selected items', () => {});
  });
});
