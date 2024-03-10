import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private _EcomdataService:EcomdataService , private _CartService:CartService , private _ToastrService:ToastrService , private _WishlistService:WishlistService){}
  isSelected:any[] =[]
  wishList:string[] =[]; 

  products:any[] = [] // products [{}]
  
  Categories:any[] =[]

  searchTerm:string = ''

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
}
