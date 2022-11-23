import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompanyTouristPlacesComponent } from './manage-company-tourist-places.component';

describe('ManageCompanyTouristPlacesComponent', () => {
  let component: ManageCompanyTouristPlacesComponent;
  let fixture: ComponentFixture<ManageCompanyTouristPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCompanyTouristPlacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCompanyTouristPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
