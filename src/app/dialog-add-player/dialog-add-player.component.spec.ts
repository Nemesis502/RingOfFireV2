import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPlayerComponent } from './dialog-add-player.component';

describe('DialogAddPlayerComponent', () => {
  let component: DialogAddPlayerComponent;
  let fixture: ComponentFixture<DialogAddPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddPlayerComponent]
    });
    fixture = TestBed.createComponent(DialogAddPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
