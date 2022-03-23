import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Filter } from 'src/app/models/filter';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Tag {
  content: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  publisher!: string[];
  startDate!: string;
  endDate!: string;
  usersTags!: string[];

  filter!: Filter

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any[] = [];


  constructor() { }

  ngOnInit(): void {
  }
  addfilter(){
    const newFilter= {} as Filter;
    newFilter.publisher=this.publisher
    newFilter.startDate=this.startDate
    newFilter.endDate=this.endDate
    newFilter.tags=this.tags
    newFilter.usersTags=this.usersTags
    console.log(newFilter)
    
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
