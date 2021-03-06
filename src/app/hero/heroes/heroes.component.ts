import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {

  datasource: Hero[] = [];
  selectedHero: Hero[];
  heroes: Hero[];
  cols: any[];
  totalRecords: number;
  bordered = false;
  loading = false;
  sizeChanger = false;
  pagination = true;
  header = true;
  title = true;
  footer = true;
  fixHeader = false;
  size = 'small';
  allChecked = false;
  indeterminate = false;
  displayData: any[] = [];
  simple = false;
  noResult = false;
  position = 'bottom';
  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
    const expandContent = (data: any) => {
      return `${data['name']} ${data['alterEgo']}`;
    };
    this.cols = [
      { propertyName: '_expand', displayName: 'expand', controlType: 'expand', show: 1, callback: expandContent },
      { propertyName: '_rowcheck', displayName: 'rowcheck', controlType: 'rowcheck', show: 1 },
      { propertyName: 'name', displayName: 'name', controlType: 'text', show: 1 },
      { propertyName: 'power', displayName: 'power', controlType: 'dropdown', show: 1 },
      { propertyName: 'alterEgo', displayName: 'alterEgo', controlType: 'text', show: 1 },
      { propertyName: 'birthday', displayName: 'birthday', controlType: 'date', show: 1 },
    ];
  }
  getExpandContent(data: any) {
    return `${data['name']}-描述信息`;
  }
  get expandColspan() {
    return this.cols.filter(x => !['expand'].includes(x.type)).length;
  }
  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.datasource = heroes;
      this.totalRecords = heroes.length;
      //  this.dt.totalRecords=this.totalRecords;
    });
  }
  onSelect(hero: Hero): void {
    // this.selectedHero = hero;
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        //  this.heroes.push(hero);
        this.heroes = [...this.heroes, hero];
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  currentPageDataChange(
    $event: Array<{
      name: string;
      age: number;
      address: string;
      checked: boolean;
      expand: boolean;
      description: string;
    }>
  ): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
}
