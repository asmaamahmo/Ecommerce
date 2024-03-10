// import { WishlistService } from './../../shared/services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';

import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit{
  constructor( private _WishlistService:WishlistService , private _CartService:CartService ,   private _ToastrService:ToastrService){}
  
  cartDetails:Product[] = []
  
  wishList:string[] =[];

  addWishlist(id:string):void {
    this._CartService.addToCart(id).subscribe({
      next:(response) => {
        console.log(response);
        this._ToastrService.success(response.message)


        this._CartService.cartNamber.next(response.numOfCartItems)
        this.removeItem(id);
        
      },
      error:(err) =>{
        console.log(err);
        
      }
    })
  }

  // addWishlist(id:string):void{
  //   this._WishlistService.addToWishlist(id).subscribe( {
  //     next:(response)=>{
  //       console.log(response.data);
        
        
  //       this._ToastrService.success(response.message);
  //       this.cartDetails = response.data;
  //       this.wishList = response.data;
        
  //     }
  //   } )
  // }
  
  removeItem(id: string) {
    this._WishlistService.removeItemWishlist(id).subscribe({
      next: (response) => {
        console.log(response.data);
        // this.cartDetails = response.data;
        this.wishList = response.data;
        const newCartsData = this.cartDetails.filter ((item:any)=>  this.wishList.includes(item._id))
        this.cartDetails = newCartsData;

        // this._WishlistService.getWishlist().subscribe( {
        //   next:(response) =>{
        //     this.cartDetails = response.data;
        //   }
        // } )
        
      }
    });
  }
  


  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe( {
      next:(response)=>{
        console.log(response.data);
        this.cartDetails = response.data;
        
        
        const newData = response.data.map( (item:any)=> item.id)
        console.log(newData);

        this.wishList = newData;
      }
    } )

   
  }
  

}
