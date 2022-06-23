import { Setting } from './../../models/setting';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<SettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public settings: Setting,
  ) {}
  ngOnInit(): void {
    console.log(this.settings);
    
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
