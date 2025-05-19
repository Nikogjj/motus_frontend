import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEndComponent } from './pop-up-end.component';

describe('PopUpEndComponent', () => {
  let component: PopUpEndComponent;
  let fixture: ComponentFixture<PopUpEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpEndComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
