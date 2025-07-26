import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAnimal } from './details-animal';

describe('DetailsAnimal', () => {
  let component: DetailsAnimal;
  let fixture: ComponentFixture<DetailsAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAnimal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAnimal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
