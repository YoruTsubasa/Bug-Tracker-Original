import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserType, UserTypeLabelMapping} from "../../enums/userType";
import {SortPipe} from "../../pipes/sort-pipe";
import {PaginationPipe} from "../../pipes/pagination-pipe";
import getDocumentElement from "@popperjs/core/lib/dom-utils/getDocumentElement";

@Component({
  selector: 'app-manage-user-roles',
  templateUrl: './manage-user-roles.component.html',
  styleUrls: ['./manage-user-roles.component.css']
})
export class ManageUserRolesComponent implements OnInit{
  public users: User[] = [];
  public usersCopy: User[] = [];
  public userName: any;

  public userTypeLabelMapping;
  public userTypesKeys;
  public selectedUserOption: string;
  public selectedRoleOption: string;
  public pageIndex: number = 0;
  public pageSize: number = 7;
  public pageNumber: any;

  public userTypes = Object.values(UserType).filter(value => typeof value === 'number');
  private userTypeKeys: string[] =  Object.keys(UserType).filter(value => isNaN(Number(value)));


  constructor(private userService: UserService) {
    this.userService = userService;
    this.userTypeLabelMapping = UserTypeLabelMapping;
    this.selectedUserOption = '';
    this.selectedRoleOption = '';
    this.userTypesKeys = Array.from(this.userTypes.keys());
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((result)=> {
      this.users = result.sort((userA, userB)=> userA.lastName! < userB.lastName! ? -1 : 1);
      this.usersCopy = this.users;
    });
  }

  onSubmit(){
    if(!this.selectedRoleOption)
      return;

    if(!this.selectedUserOption)
      return;

    let user = this.usersCopy.find((user)=> user.guid == this.selectedUserOption);

    user!.type = Number(this.selectedRoleOption);
    this.userService.changeRole(user!);
  }

  search(){
    if(!this.userName){
      this.ngOnInit();
      return;
    }

    this.users = this.usersCopy.filter((user)=>{
      let name = user.firstName + ' ' + user.lastName;

      return name.toLowerCase().includes(this.userName.toLowerCase());
    });
  }

  ascending: boolean = false;
  sort(key: string){
    this.ascending = !this.ascending;
    let sortPipe = new SortPipe();
    this.users = sortPipe.transform(this.users, key, this.ascending);
  }

  paginate(){
    if(isNaN(parseInt(this.pageNumber)))
      return;

    if(parseInt(this.pageNumber) < 0)
      return;

    if(Number(this.pageNumber) * this.pageSize >= this.usersCopy.length){
      console.log('pagination');
      return;
    }

    let paginationPipe = new PaginationPipe();
    this.users = paginationPipe.transform(this.usersCopy, this.pageSize, Number(this.pageNumber));
  }

  incrementPagination(){
    if((this.pageIndex + 1) * this.pageSize >= this.usersCopy.length)
      return;

    this.pageIndex++;
    let paginationPipe = new PaginationPipe();
    this.users = paginationPipe.transform(this.usersCopy, this.pageSize, this.pageIndex);


  }

  decrementPagination(){
    if((this.pageIndex + 1) * this.pageSize >= this.usersCopy.length)
      return;

    if(this.pageIndex -1 < 0)
      return;

    this.pageIndex--;
    let paginationPipe = new PaginationPipe();
    this.users = paginationPipe.transform(this.usersCopy, this.pageSize, this.pageIndex);


  }

}
