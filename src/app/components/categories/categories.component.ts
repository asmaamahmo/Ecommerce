import { Category, Product } from './../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  constructor( private _EcomdataService:EcomdataService ){}

  Product:Category[] = []
  ngOnInit(): void {
    this._EcomdataService.getCategories().subscribe( {
      next:(response)=>{
        this.Product = response.data;
      }
    } )
  }

  getCategoryId(id:string){
    this._EcomdataService.getSubCategories(id).subscribe( {
      next:(response)=>{
        console.log(response);
        
      }
    } )
  }

}
