import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEnclos } from './liste-enclos';

describe('ListeEnclos', () => {
  let component: ListeEnclos;
  let fixture: ComponentFixture<ListeEnclos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEnclos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEnclos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
