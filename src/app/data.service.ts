import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    //return this.http.get('https://jsonplaceholder.typicode.com/users')
    return this.http.get('/api/users');
  }

  getUser(userId) {
    //return this.http.get('https://jsonplaceholder.typicode.com/users/'+userId);
    return this.http.get('/api/user/'+userId);
  }

  getPosts() {
    //return this.http.get('https://jsonplaceholder.typicode.com/posts')
    return this.http.get('/api/posts/');
  }
}
