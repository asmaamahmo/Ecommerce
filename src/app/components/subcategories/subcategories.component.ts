
import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { CategoriesComponent } from '../categories/categories.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Subcategory, Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit{

  constructor(  private _EcomdataService:EcomdataService, private _ActivatedRoute:ActivatedRoute ){}


  

  categoryId:string|null = '' ;
  categoryname: string|null = '';
 
  subcategory: Subcategory[] = [];

  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe( {
      next:(param)=>{
       this.categoryId =  param.get('categoryId');
       this.categoryname = param.get('categoryName')
      //  this.categoryname = param.get('name')
     

      this._EcomdataService.getCategoryId(this.categoryId).subscribe( {

        next:(response)=>{
          console.log(response.data.name);
          this.categoryname = response.data.name;
          
        }
      } )

       this._EcomdataService.getSubCategories(this.categoryId).subscribe( {
        next:(response)=>{
          console.log(response.data);
          this.subcategory = response.data;
        
          
        
         
          
        }
      });
      }
    } )
    

    // if (this.categoryId) {
    //   this._EcomdataService.getSubCategories(this.categoryId).subscribe(response => {
    //     this.subcategory = response.data;
    //   });
    // }
  
  }



}
