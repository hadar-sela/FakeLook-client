import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Filter } from 'src/app/models/filter';
import { MatChipInputEvent } from '@angular/material/chips';
import { FilterService } from 'src/app/services/filter.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { RouterServiceService } from 'src/app/services/router-service.service';
import { Post } from 'src/app/models/post';

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
  

  startDate!: Date;
  endDate!: Date;
  usersTags: string[]=[];

  constructor( private filterService: FilterService,private readonly router: Router,private dialog: MatDialog,private routerService: RouterServiceService) { }

  ngOnInit(): void {
  }
  addfilter(){
    const newFilter= {} as Filter;
    newFilter.publishers=[];

    newFilter.publishers.push({userName : "galit" } as User)
    
    //newFilter.publisher=this.publisher 
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

    // Add our fruit
    if (value) {
      let tag ={} as Tag;
      tag.content = value;
      this.tags.push({content:value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
