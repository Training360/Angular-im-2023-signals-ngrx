import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSettingsComponent } from './table-settings.component';

describe('TableSettingsComponent', () => {
  let component: TableSettingsComponent;
  let fixture: ComponentFixture<TableSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSettingsComponent]
    });
    fixture = TestBed.createComponent(TableSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
