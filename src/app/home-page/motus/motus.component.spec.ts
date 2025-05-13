import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotusComponent } from './motus.component';

describe('MotusComponent', () => {
  let component: MotusComponent;
  let fixture: ComponentFixture<MotusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
