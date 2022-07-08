import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HEROES } from '../entities/mock-heroes';
import { Hero } from '../entities/hero';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>{
    const heroes = of(HEROES); //of(HEROES) returns an Observable<Hero>
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero>{
    const hero = HEROES.find(hero => hero.id === id)!; //! tells us we'll always find a hero with hero.id = id
    this.messageService.add(`HeroService: fetched hero id = ${id}`);
    return of(hero); //of(hero) returns an Observable<Hero>
  }
}
