import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor( private _WishlistService: WishlistService,private _EcomdataService:EcomdataService , private _CartService:CartService , private _ToastrService:ToastrService){}
  
  isSelected:any[] =[]
  products:any[] = [] // products [{}]
  
  Categories:any[] =[]
  wishList:string[] =[]; 
  searchTerm:string = ''
  

  addCart(id:string):void {
    this._CartService.addToCart(id).subscribe({
      next:(response) => {
        console.log(response);
        this._ToastrService.success(response.message)


        this._CartService.cartNamber.next(response.numOfCartItems)
        
      },
      error:(err) =>{
        console.log(err);
        
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
   items: 1,
    nav: false
  }

  addWishlist(id:string , index:number):void{
    this._WishlistService.addToWishlist(id).subscribe( {
      next:(response)=>{
        console.log(response.data);
        this.isSelected[index] = !this.isSelected[index];
        this._ToastrService.success(response.message);
        this.wishList = response.data;
        

   
      }
    } )
  }

  ngOnInit(): void {
    //  get All Products
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._EcomdataService.getAllProducts().subscribe( {
      next:(responce)=>{
         this.products = responce.data        

      }
    } );

    // get Categories
    this._EcomdataService.getCategories().subscribe( {
      next:(response) => {
        
        this.Categories = response.data ;      
      }
    } );

    this._WishlistService.getWishlist().subscribe( {
      next:(response)=>{
        console.log(response.data);

        const newData = response.data.map( (item:any)=> item._id)
        console.log(newData);

        this.wishList = newData;
        
      }
    } )
  }
}
