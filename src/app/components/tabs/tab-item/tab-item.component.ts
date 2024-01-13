import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-tab-item',
    templateUrl: './tab-item.component.html',
    styleUrl: './tab-item.component.css'
})
export class TabItemComponent {
    @Input({ required: true }) title: string;
    @Input() active = false;

    @Output() close = new EventEmitter<void>();
}
