import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclientdialogComponent } from './addclientdialog.component';

describe('AddclientdialogComponent', () => {
  let component: AddclientdialogComponent;
  let fixture: ComponentFixture<AddclientdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddclientdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddclientdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
