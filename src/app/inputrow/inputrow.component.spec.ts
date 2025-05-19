import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputrowComponent } from './inputrow.component';

describe('InputrowComponent', () => {
  let component: InputrowComponent;
  let fixture: ComponentFixture<InputrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputrowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
