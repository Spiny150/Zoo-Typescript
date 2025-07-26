import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAnimalDialog } from './ajout-animal-dialog';

describe('AjoutAnimalDialog', () => {
  let component: AjoutAnimalDialog;
  let fixture: ComponentFixture<AjoutAnimalDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutAnimalDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutAnimalDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
