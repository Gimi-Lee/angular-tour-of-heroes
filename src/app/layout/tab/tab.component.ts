import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, OnDestroy, ViewContainerRef, SystemJsNgModuleLoader, ComponentRef, ComponentFactoryResolver, NgModuleFactory } from '@angular/core';
import { TabConfig } from './tab-config';
import { Router, NavigationStart, NavigationEnd, ActivationEnd, ActivatedRoute } from '@angular/router';
import { TabViewService } from '../../services/tab-view.service';
import { TabView } from 'primeng/tabview';
import { filter } from 'rxjs/operators';
import { TabDecorator } from '../../decorator/tab-component.decorator';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  //tabItems: TabItem[] = [];
  tabs: TabConfig[] = [];
  @ViewChild('tabView') tabView: TabView;
  ngOnInit(): void {
    console.log(this.tabs);
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private tabViewService: TabViewService) {
    // console.log(this.route);
    //this.router.events.subscribe(e=>console.log(e));
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      //let [url, para] = e.url.split('?');
      const firstChild = this.route.firstChild;
      const component: any = firstChild ? firstChild.component : null;
      if (!component) { return; }
      const tabMeta = TabDecorator.getTabMetadata(component) || { name: '无标题' };
      const key = window.btoa(encodeURIComponent(e.url));
      let index = this.tabs.findIndex(x => x.key == key);
      if (index < 0) {
        this.tabs.push({ key: key, component: component, title: tabMeta.name, active: true, removable: true, routeLink: e.url });
        this.tabView.activeIndex = index = this.tabs.length - 1;
      }
      if (index != this.tabView.activeIndex) {
        this.tabView.activeIndex = this.tabs.findIndex(x => x.key == e.url);
      }
    })

  }
  handleChange(e: Event & { index: number }) {
    const i = e.index;
    if (this.tabs.length > i && this.tabs[i].routeLink) {
      this.router.navigateByUrl(this.tabs[i].routeLink);
    }
    this.title.setTitle(this.tabs[i].title);
  }
  handleClose(e: any) {
    // e.stopPropagation();
    const i = e.index;
    this.tabs.splice(i, 1);
    if (this.tabs.length > 0 && this.tabView.activeIndex == i) {
      this.tabView.activeIndex = i - 1;
      this.router.navigateByUrl(this.tabs[i - 1].routeLink);
    }
    // e.close();
  }
}

@Component({
  selector: 'tab-container',
  template: `
    <template #container></template>
    <div *ngIf="!loaded" class="loader"></div>
  `,
  styles: [`
    .loader {
      position: relative;
      min-height: 100px;
    }
    .loader:after {
      content: 'Loading module. Please waiting...';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `]
})
export class TabContainerComponent implements OnInit, OnDestroy {

  @Input()
  tabConfig: TabConfig;
  loaded: boolean;
  @ViewChild('container', { read: ViewContainerRef }) vcRef: ViewContainerRef;
  compRef: ComponentRef<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private moduleLoader: SystemJsNgModuleLoader) { }
  ngOnInit(): void {
    this.loadComponent();
  }
  loadComponent() {

    // const comp = this.vcRef.injector.get(TabItem).component;
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.tabConfig.component);
    this.vcRef.clear();
    this.compRef = this.vcRef.createComponent(componentFactory);
    (<TabConfig>this.compRef.instance).data = this.tabConfig.data;
    this.loaded = true;
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