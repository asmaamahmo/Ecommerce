import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BuyPipe } from './buy.pipe';
import { TermtextPipe } from './termtext.pipe';
import { SearchPipe } from './search.pipe';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { MyHttpInterceptor } from './my-http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './loading.interceptor';
import { WishListComponent } from './components/wish-list/wish-list.component';

import { SubcategoriesComponent } from './components/subcategories/subcategories.component';
import { BranddetailsComponent } from './branddetails/branddetails.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    DetailsComponent,
    NavBlankComponent,
    NavAuthComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    BuyPipe,
    TermtextPipe,
    SearchPipe,
    CheckoutComponent,
    AllordersComponent,
    WishListComponent,
    
    SubcategoriesComponent,
         BranddetailsComponent,
         ForgetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,

  ],
  providers: [
    { provide:HTTP_INTERCEPTORS , useClass: MyHttpInterceptor , multi:true },
    { provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
