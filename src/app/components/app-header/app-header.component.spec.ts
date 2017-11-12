import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppHeaderComponent } from './app-header.component';

describe('AppHeaderComponent', () => {
    let comp: AppHeaderComponent;
    let fixture: ComponentFixture<AppHeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AppHeaderComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
        fixture = TestBed.createComponent(AppHeaderComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

});
