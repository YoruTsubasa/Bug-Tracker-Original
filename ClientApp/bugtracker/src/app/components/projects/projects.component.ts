import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project-service.service";
import {SortPipe} from "../../pipes/sort-pipe";
import {PaginationPipe} from "../../pipes/pagination-pipe";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
 public projectName: any;
 public projects: Project[] = [];
 public projectsCopy: Project[] = [];

  public pageIndex: number = 0;
  public pageSize: number = 7;
  public pageNumber: any;

 constructor(private projectService: ProjectService) {
 }

  ngOnInit() {
    this.projectService.getProjects().subscribe((result)=>{
      this.projects = result;
      this.projectsCopy = result;
    });
  }





  search(){
    if(!this.projectName){
      this.ngOnInit();
      return;
    }

    this.projects = this.projectsCopy.filter((project)=>{
      return project.name.toLowerCase().includes(this.projectName.toLowerCase());
    });
  }

  ascending: boolean = false;
  sort(key: string){
    this.ascending = !this.ascending;
    let sortPipe = new SortPipe();
    this.projects = sortPipe.transform(this.projects, key, this.ascending);
  }

  paginate(){
    if(isNaN(parseInt(this.pageNumber)))
      return;

    if(parseInt(this.pageNumber) < 0)
      return;

    if(Number(this.pageNumber) * this.pageSize >= this.projectsCopy.length){
      console.log('pagination');
      return;
    }

    let paginationPipe = new PaginationPipe();
    this.projects = paginationPipe.transform(this.projectsCopy, this.pageSize, Number(this.pageNumber));
  }

  incrementPagination(){
    if((this.pageIndex + 1) * this.pageSize >= this.projectsCopy.length)
      return;

    this.pageIndex++;
    let paginationPipe = new PaginationPipe();
    this.projects = paginationPipe.transform(this.projectsCopy, this.pageSize, this.pageIndex);


  }

  decrementPagination(){
    if((this.pageIndex + 1) * this.pageSize >= this.projectsCopy.length)
      return;

    if(this.pageIndex -1 < 0)
      return;

    this.pageIndex--;
    let paginationPipe = new PaginationPipe();
    this.projects = paginationPipe.transform(this.projectsCopy, this.pageSize, this.pageIndex);
  }

}
