import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../entities/hero';

@Injectable({providedIn: 'root'})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){

    const heroes = [
    { id: 12, name: 'Dr. Strange' },
    { id: 13, name: 'Iron Man' },
    { id: 14, name: 'Superman' },
    { id: 15, name: 'Batman' },
    { id: 16, name: 'Superwoman' },
    { id: 17, name: 'Catwoman' },
    { id: 18, name: 'Spiderman' },
    { id: 19, name: 'Thor' }
    ];

    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty, the method returns the initial number (11).
  // If the heroes array is not empty, the method returns the highest hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
