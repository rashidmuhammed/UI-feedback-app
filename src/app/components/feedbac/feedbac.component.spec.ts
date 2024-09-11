import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacComponent } from './feedbac.component';

describe('FeedbacComponent', () => {
  let component: FeedbacComponent;
  let fixture: ComponentFixture<FeedbacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
