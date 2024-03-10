import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute  ,private _EcomdataService:EcomdataService , private _CartService:CartService , private _ToastrService:ToastrService){}

  productDetails:Product = {} as Product;


  addCart(id:string):void {
    this._CartService.addToCart(id).subscribe({
      next:(response) => {
        console.log(response);
        this._ToastrService.success(response.message)
        
      },
      error:(err) =>{
        console.log(err);
        
      }
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe( {
      next:( params) => {
       let idProduct:any = params.get('id')
       
      //  Api ----- idProduct
      this._EcomdataService.getProductDetails(idProduct).subscribe( {
        next:(Response) => {
          console.log(Response.data);
          
          this.productDetails = Response.data;
          
        }
      } )

       
        
        
      }
    } )
  }
  imgSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
   items: 1,
    nav: false
  }
}
