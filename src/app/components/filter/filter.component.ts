import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Filter } from 'src/app/models/filter';
import { MatChipInputEvent } from '@angular/material/chips';
import { FilterService } from 'src/app/services/filter.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { RouterServiceService } from 'src/app/services/router-service.service';
import { Post } from 'src/app/models/post';
import { AddPostService } from 'src/app/services/add-post.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';

export interface Tag {
  content: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filter!: Filter
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any[] = [];
  publisher: User[]=[];
  userNames: string[] = [];
  filteredUsers: Observable<string[]>;
  userCtrl = new FormControl();
  userTagged: string[] = [];
  startDate!: Date;
  endDate!: Date;
  usersTags: string[]=[];

  constructor(private AddPostService: AddPostService, private filterService: FilterService,private readonly router: Router,private dialog: MatDialog,private routerService: RouterServiceService) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => (user ? this._filter(user) : this.userNames.slice())),
    );
   }

  ngOnInit(): void {
    this.initUsers();
  }
  addfilter(){
    const newFilter= {} as Filter;
    newFilter.publishers=[];

    for (let i = 0; i < this.userTagged.length; i++) {
      newFilter.publishers.push({userName: this.userTagged[i]} as User);
    }
    newFilter.startDate=this.startDate
    newFilter.endDate=this.endDate
    newFilter.tags=this.tags
    newFilter.usersTags=this.usersTags
    console.log(newFilter)
    this.filterService.addNewFilter(newFilter).subscribe((result)=>{
      console.log(result);
      this.routerService.filteChanged(result)
      this.dialog.closeAll();
    
    })
    
  }

  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      let tag ={} as Tag;
      tag.content = value;
      this.tags.push({content:value});
    }

    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  initUsers(){
    this.AddPostService.getUsers().subscribe((result)=>{
      for (let index = 0; index < result.length; index++) {
        this.userNames.push(result[index].userName);
      }
    })
  }

    //TryTagUsers
    addUser(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      if (value) {
        for (let i = 0; i < this.userNames.length; i++) {
          if(value==this.userNames[i]){
            this.userTagged.push(value);
          }       
        }
      }
      // Clear the input value
      event.chipInput!.clear();
      this.userCtrl.setValue(null);
    }
  
    removeUser(user: string): void {
      const index = this.userTagged.indexOf(user);
      if (index >= 0) {
        this.userTagged.splice(index, 1);
      }
    }
  
    selected(event: MatAutocompleteSelectedEvent): void {
      this.userTagged.push(event.option.viewValue);
      this.userCtrl.setValue(null);
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.userNames.filter(user => user.toLowerCase().includes(filterValue));
    }
}
