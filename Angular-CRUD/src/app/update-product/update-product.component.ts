import { Component, OnInit } from '@angular/core';
import { Response, Headers } from '@angular/http';
import {ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id:number;
  data = [];
  allData=[];
  exist = false;
  updatedDataObj:object = {};
  
  private headers = new Headers({ 'Content-Type': 'application/json'});
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  updateProduct(inputValue) {
    this.updatedDataObj = {
      inputField_lastName: inputValue.inputField_lastName,
      inputField_firstName: inputValue.inputField_firstName,
      inputField_address: inputValue.inputField_address,
      inputField_city: inputValue.inputField_city
    };
    const url = `${"http://localhost:3005/user"}/${this.id}`;
    this.http.put(url,this.updatedDataObj)
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      })

      
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.http.get("http://localhost:3005/users").subscribe(
      data => {
        this.allData = data as string []
        for(var i = 0; i < this.allData.length ; i++) {
          if(parseInt(this.allData[i].id) === this.id) {
            this.exist = true;
            this.data = this.allData[i];
            break;
          } else {
            this.exist = false;
          }
        }
      }
    )
  }

}
