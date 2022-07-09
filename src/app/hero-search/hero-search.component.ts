import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../entities/hero';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms.next(term); //push a search term into the observable stream
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300), // wait 300ms after each keystroke before considering the term due to request overload risk

      distinctUntilChanged(), // ignore new term if same as previous term, sends request only when term is different

      //switch to new search each time the term changes, show results for latest search only
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
