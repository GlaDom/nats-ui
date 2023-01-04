import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientinformationComponent } from './clientinformation.component';

describe('ClientinformationComponent', () => {
  let component: ClientinformationComponent;
  let fixture: ComponentFixture<ClientinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientinformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
