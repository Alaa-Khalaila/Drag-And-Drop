import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DragItem } from '../types/DragItem';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:5000/';
  constructor(private http: HttpClient) {}

  // books,names
  getData(str: string): Observable<DragItem[]> {
    return this.http.get<DragItem[]>(this.apiUrl + str);
  }
}
