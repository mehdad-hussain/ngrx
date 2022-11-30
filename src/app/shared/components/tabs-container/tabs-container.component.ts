import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss'],
})
export class TabsContainerComponent implements OnInit {
  @Input() tabsContainerClasses: string = '';

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> =
    new QueryList();
  // @ContentChildren(TabComponent) tabs?: QueryList<TabComponent>;

  // idea: initial value of the property is being rejected by typescript
  // idea: value must be an instance of the QueryList object
  // idea: alternative: we can make this property optional by adding ? after the type and removing the initial value

  constructor() {}

  ngOnInit(): void {
    // idea: runs after component is initialized
    // console.log(this.tabs);
  }

  ngAfterContentInit(): void {
    // idea: runs after projected content has been initialized
    // console.log(this.tabs);

    const activeTabs = this.tabs?.filter((tab) => tab.active);

    if (activeTabs.length === 0 || !activeTabs) {
      this.selectTab(this.tabs!.first);
    }
  }

  selectTab(tab: TabComponent): boolean {
    this.tabs?.forEach((tab) => (tab.active = false));
    tab.active = true;

    // idea: alternative way to prevent default behavior of the event

    return false;
  }
}
