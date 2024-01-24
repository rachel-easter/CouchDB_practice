import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  addEmployee(name: string, id: string, fingerprintImage: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/addEmployee`, { name, id, fingerprintImage });
  }
}
