import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, ViewContainerRef, SystemJsNgModuleLoader, ComponentRef, ComponentFactoryResolver, NgModuleFactory, Renderer2 } from '@angular/core';
import { TabConfig } from './tab-config';
import { Router, NavigationStart, NavigationEnd, ActivationEnd, ActivatedRoute, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { TabViewService } from '../../services/tab-view.service';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TabDecorator } from '../../_decorators/tab-component.decorator';
import { Title } from '@angular/platform-browser';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  // tabItems: TabItem[] = [];
  get tabs(): TabConfig[] {
    return this.tabViewService.getTabs();
  }
  activeIndex: number;
  loading: boolean;
  //  @ViewChild('tabView') tabView: TabView;
  ngOnInit(): void {
    console.log(this.tabs);
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private tabViewService: TabViewService) {
    // this.router.events.pipe(filter(e => e instanceof RouteConfigLoadStart)).subscribe(e=>console.log(e));
    this.router.events.subscribe((e) => {
      if (e instanceof RouteConfigLoadStart) {
        this.loading = true;
      }
      if (e instanceof RouteConfigLoadEnd) {
        this.loading = false;
      }
      if (e instanceof NavigationEnd) {
        const index = this.tabViewService.addByRoute();
        if (index !== this.activeIndex) {
          this.activeIndex = index;
        }
      }
    });
  }
  handleChange(e: Event & { index: number }) {
    const i = e.index;
    if (this.tabs.length > i && this.tabs[i].routeLink) {
      this.router.navigateByUrl(this.tabs[i].routeLink);
    }
    this.title.setTitle(this.tabs[i].header);
  }
  handleClose(e: TabConfig) {
    // e.stopPropagation();
    const i = this.tabViewService.removeTab(e.key);
    if (this.activeIndex === i) {
      this.activeIndex = i - 1;
      const url = this.tabs.length > 0 ? this.tabs[i - 1].routeLink : this.route.snapshot.parent.url[0].path;
      this.router.navigateByUrl(url);
    }


    // e.close();
  }
}

@Component({
  selector: 'app-tab-container',
  template: `<template #container></template>`,
  styles: [``]
})
export class TabContainerComponent implements OnInit, OnDestroy {

  @Input() tabConfig: TabConfig;
  @ViewChild('container', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;
  compRef: ComponentRef<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private moduleLoader: SystemJsNgModuleLoader) { }
  ngOnInit(): void {
    this.loadComponent();
  }
  loadComponent() {

    // const comp = this.vcRef.injector.get(TabItem).component;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.tabConfig.component);
    this.vcRef.clear();
    this.compRef = this.vcRef.createComponent(componentFactory);
    (<TabConfig>this.compRef.instance).data = this.tabConfig.data;
  }
  _loadComponent() {
    this.moduleLoader.load(`app/hero/hero.module#HeroModule`)
      .then((moduleFactory: NgModuleFactory<any>) => {
        console.log(moduleFactory);

        // const vcRef = this.vcRef;
        // const ngModuleRef = moduleFactory.create(vcRef.parentInjector);
        // const comp = ngModuleRef.injector.get(LazyLoadConfig).component;
        // const compFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(comp);
        // this.compRef = vcRef.createComponent(compFactory, 0, ngModuleRef.injector);

        //  this.loaded = true;
      });
  }
  ngOnDestroy(): void {
    this.compRef.destroy();
  }

}
