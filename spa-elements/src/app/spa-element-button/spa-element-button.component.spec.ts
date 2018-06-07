import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaElementButtonComponent } from './spa-element-button.component';

describe('SpaElementButtonComponent', () => {
  let component: SpaElementButtonComponent;
  let fixture: ComponentFixture<SpaElementButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaElementButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaElementButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
