import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsDetailsComponent } from './conditions-details.component';

describe('ConditionsDetailsComponent', () => {
    let component: ConditionsDetailsComponent;
    let fixture: ComponentFixture<ConditionsDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConditionsDetailsComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ConditionsDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
