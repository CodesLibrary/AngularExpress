import { Component, OnInit } from '@angular/core';
import {Response, Headers} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient,private _titleService: Title) { }
  id:number;
  private headers = new Headers({ 'Content-Type': 'application/json'});

  allData = [];
  fetchData = function() {
    this.http.get("http://localhost:3005/users").subscribe(
      data => {
        this.allData = data;
      }
    )
  }

  deleteProduct = function(id) {
    if(confirm("Are you sure?")) {
      const url = `${"http://localhost:3005/user"}/${id}`;
      return this.http.delete(url, {headers: this.headers}).toPromise()
        .then(() => {
        this.fetchData();
        })
    }
  }

  ngOnInit() {
    this.fetchData();
    this._titleService.setTitle('Home Page');
  }
}
