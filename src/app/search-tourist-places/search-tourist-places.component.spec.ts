import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTouristPlacesComponent } from './search-tourist-places.component';

describe('SearchTouristPlacesComponent', () => {
  let component: SearchTouristPlacesComponent;
  let fixture: ComponentFixture<SearchTouristPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTouristPlacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTouristPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
