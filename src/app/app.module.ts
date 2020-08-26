import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


// Importaciones de AngularFire
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuthGuardModule  } from '@angular/fire/auth-guard';
import { environment } from "../environments/environment";

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MyNavComponent } from './components/my-nav/my-nav.component';
import { MenuOptionsComponent } from './components/menu-options/menu-options.component';
import { NavComponent } from './pages/nav/nav.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyNavComponent,
    MenuOptionsComponent,
    NavComponent,
    NotFoundComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
