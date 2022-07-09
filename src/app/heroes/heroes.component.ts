import { Component, OnInit } from '@angular/core';

import { HeroService } from '../service/hero.service';
import { MessageService } from '../service/message.service';
import { Hero } from '../entities/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  addHero(name: string): void {
    name = name.trim(); //removes white-spaces
    if(!name) { return; }
    this.heroService.addHero( {name} as Hero ) //type assertion
        .subscribe(hero => {
          this.heroes.push(hero);
        })
  }

  deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe(); //if we forget subscribe, the service won't send the request to the server
  }
}
