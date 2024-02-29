import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  constructor(private http:HttpClient,private snackBar: MatSnackBar) { }

  get(url:any){
    return this.http.get(environment.apiUrl+url);
  }

  post(url:any,data:any){
    return this.http.post(environment.apiUrl+url,data);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
    });
  }

}
