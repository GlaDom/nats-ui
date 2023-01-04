import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMonitoringComponent } from './client-monitoring.component';

describe('ClientMonitoringComponent', () => {
  let component: ClientMonitoringComponent;
  let fixture: ComponentFixture<ClientMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
