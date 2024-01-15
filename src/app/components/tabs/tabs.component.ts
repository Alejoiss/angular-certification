import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TabItemComponent } from 'app/components/tabs/tab-item/tab-item.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements AfterContentInit {
    @ContentChildren(TabItemComponent) tabs: QueryList<TabItemComponent>;

    // If true, the last tab will be shown when a new tab is added dinamically
    @Input() showLastOnAdd = false;

    ngAfterContentInit(): void {
        this.checkForActiveTabs();

        // When a new tab is added into ng-content, check if it should be marked as active
        this.tabs.changes.subscribe(() => this.checkForActiveTabs());
    }

    checkForActiveTabs() {
        const activeTabs = this.tabs.filter(t => t.active);

        if (activeTabs.length === 0) {
            this.markTabActive(this.tabs.first);
        } else if (this.showLastOnAdd) {
            this.markTabActive(this.tabs.last);
        }
    }

    markTabActive(tab: TabItemComponent, e: MouseEvent = null) {
        if (!e || (e && !(e.target as HTMLElement).closest('.close'))) {
            this.tabs.forEach(t => t.active = t === tab);
        }
    }

    close(tab: TabItemComponent): void {
        tab.close.emit();
    }
}
