import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficulteComponent } from './difficulte.component';

describe('DifficulteComponent', () => {
  let component: DifficulteComponent;
  let fixture: ComponentFixture<DifficulteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifficulteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifficulteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
