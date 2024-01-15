import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-tab-item',
    templateUrl: './tab-item.component.html',
    styleUrl: './tab-item.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabItemComponent implements AfterContentChecked {
    @Input({ required: true }) title: string;
    @Input() active = false;

    @Output() close = new EventEmitter<void>();

    constructor(
        private cdr: ChangeDetectorRef
    ) { }

    ngAfterContentChecked(): void {
        this.cdr.detectChanges();
    }
}
