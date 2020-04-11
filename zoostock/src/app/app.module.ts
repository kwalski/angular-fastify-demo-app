import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnimalsComponent } from './animals/animals.component';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZooService } from './zoo.service';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routeConfig: Routes = [
  { path: '', redirectTo: 'animals', pathMatch: 'full' },
  { path: 'animals', component: AnimalsComponent }
];
@NgModule({
  declarations: [AppComponent, AnimalsComponent],
  imports: [
    BrowserModule,

    RouterModule.forRoot(routeConfig, { useHash: true }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [ZooService],
  bootstrap: [AppComponent]
})
export class AppModule {}
