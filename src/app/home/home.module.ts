import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';
import { PokemonService } from './services/pokemon.service';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListPokemonComponent
  ],
  exports: [
    HomeComponent,
    ListPokemonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbModule
  ],
  providers: [
    PokemonService
  ]
})
export class HomeModule { }
