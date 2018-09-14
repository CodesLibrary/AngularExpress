import { Component, OnInit } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private http: HttpClient,private _titleService: Title) { }
  confirmationString:string = "New product has been added";
  isAdded: boolean = false;
  addDataObj:object = {};

  addNewProduct = function(inputValue) {
    this.addDataObj = {
      inputField_lastName: inputValue.inputField_lastName,
      inputField_firstName: inputValue.inputField_firstName,
      inputField_address: inputValue.inputField_address,
      inputField_city: inputValue.inputField_city
    }
    this.http.post("http://localhost:3005/user_create", this.addDataObj).subscribe((res:Response) => {
      this.isAdded = true;
    })
  }

  ngOnInit() {
    this._titleService.setTitle('Products');
  }

}
