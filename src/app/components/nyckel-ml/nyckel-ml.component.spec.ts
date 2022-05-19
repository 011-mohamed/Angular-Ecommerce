import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NyckelMlComponent } from './nyckel-ml.component';

describe('NyckelMlComponent', () => {
  let component: NyckelMlComponent;
  let fixture: ComponentFixture<NyckelMlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NyckelMlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NyckelMlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
