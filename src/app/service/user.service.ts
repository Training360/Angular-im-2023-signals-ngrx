import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  apiUrl: string = environment.apiUrl + 'users/';

  list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  count$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  getAll(limit?: {page: number, limit: number}): void {
    const url = limit
      ? `${this.apiUrl}?_page=${limit.page}&_limit=${limit.limit}`
      : this.apiUrl;
    this.http.get<User[]>(url, {observe: 'response'}).subscribe(
      resp => {
        const count = Number(resp.headers.get('X-Total-Count') || '0');
        this.count$.next(count);
        this.list$.next(resp.body || []);
      }
    );
  }

  remove(user: User): void {
    this.http.delete(`${this.apiUrl}${user.id}`).subscribe();
  }

  filter(props: {[k: string]: string}, limit?: {page: number, limit: number} ): void {
    // http://localhost:3000/users?firstName=Leonard&lastName=Duffet
    let filter = Object
                  .entries(props)
                  .filter( e => e[1] )
                  .map(e => `${e[0]}=${e[1]}`)
                  .join('&');
    filter = this.apiUrl + '?' + filter;
    filter = limit
      ? filter + '&' + `_page=${limit.page}&_limit=${limit.limit}`
      : filter;
    this.http.get<User[]>(filter, {observe: 'response'}).subscribe(
      resp => {
        const count = Number(resp.headers.get('X-Total-Count') || '0');
        this.count$.next(count);
        this.list$.next(resp.body || []);
      }
    );
  }
}
