import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css']
})
export class ListPokemonComponent implements OnInit {

  page = 1;
  pageSize = 4;
  pokemons: Pokemon | any;
  collectionSize: number = 0;
  favoritePokemons = [] as any;
  
  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokemons();
  }

   getPokemons() {
    this.pokemonService.getPokemons()
      .subscribe((response: Pokemon) => {
        this.addFavoriteProp(response);
        this.configPagination(response);
    })
  }

  addFavoriteProp(response: Pokemon) {
    const copyResponse = [...response.results] 
    copyResponse.map((pokemon: any, i: number) => {
      pokemon.id = i;
      pokemon.favorite = false;
    })
    this.updatePokemons(copyResponse);
    
  }
  
  updatePokemons(resp: any) {
    const storeFavorites = JSON.parse(localStorage.getItem('fav-pokemons') || '{}');
    if (Object.keys(storeFavorites).length !== 0) {
      storeFavorites.reduce((a: any,b: any) => {
        let sameID = resp.find((e: any) => e.id === b.id) || {};
        return a.concat(Object.assign(sameID,b));
      }, [])
    }
  }

  configPagination(response: Pokemon) {
    this.pokemons = response.results
      .map((item:any, i:number) => ({id:i, ...item}))
      .slice((this.page - 1) * this.pageSize,(this.page - 1) * this.pageSize + this.pageSize)
  }
  
  selectAsFavorite(pokemon: Pokemon) {
    pokemon.favorite = !pokemon.favorite;
    this.setFavoritesOnStore();
  } 

  setFavoritesOnStore() {
    localStorage.setItem('fav-pokemons', JSON.stringify(this.pokemons));
  }

}
