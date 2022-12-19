import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddserverdialogComponent } from './addserverdialog.component';

describe('AddserverdialogComponent', () => {
  let component: AddserverdialogComponent;
  let fixture: ComponentFixture<AddserverdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddserverdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddserverdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
