import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAnimaux } from './liste-animaux';

describe('ListeAnimaux', () => {
  let component: ListeAnimaux;
  let fixture: ComponentFixture<ListeAnimaux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeAnimaux]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAnimaux);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
