import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerinformationComponent } from './serverinformation.component';

describe('ServerinformationComponent', () => {
  let component: ServerinformationComponent;
  let fixture: ComponentFixture<ServerinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerinformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
