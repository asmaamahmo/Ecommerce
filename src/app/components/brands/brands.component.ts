import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  isHidden: boolean = true;
  brandDetails: Brand = {} as Brand;
  

  brandId:any;


  close() {
    this.isHidden = true; 
}
  constructor( private _EcomdataService:EcomdataService , private _ActivatedRoute:ActivatedRoute){}

  brandData:Brand[] = []
  ngOnInit(): void {
    this._EcomdataService.getBrands().subscribe( {
      next:(response)=>{
        console.log(response);
        this.brandData = response.data;
        
      }
    } )


    this._ActivatedRoute.paramMap.subscribe( {
      next:(param)=>{
        this.brandId = param.get('id');
        
      }
    } )

  
  }
  getBrandId(id:string){
   console.log(id);
   this._EcomdataService.getBrandDetails(id).subscribe( {
    next:(response)=>{
      console.log(response);
      this.brandDetails = response.data;
      
    }
    
   } )
  //  this.brandDetails = this.brandData;
   this.isHidden = false;
   
  }
}
