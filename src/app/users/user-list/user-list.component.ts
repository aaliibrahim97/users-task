import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, observable } from 'rxjs';
import * as userActions from "../state/user.actions"
import * as fromUser from "../state/user.reducer"
import { User } from 'src/app/interfaces/user';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';
import { MatSort } from '@angular/material/sort';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  users$!:Observable<User[]>;
  error$!: Observable<String>;
  dataSource!:MatTableDataSource<User[]>
  user!: Array<User>
  overLoadData:any = []
  pageIndex:number = 1
  total_pages!:number | undefined
  loading:boolean = true
  @ViewChild(MatSort) sort!: MatSort;
  filterValue!:string
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'email', 'location', 'picture', 'edit', 'delete'];

  constructor(private store:Store<fromUser.AppState>,public dialog:MatDialog) { }

  //Dispatch data from the store
  dispatchData(page:number) {
    
    this.user = []

    this.overLoadData = []

    this.store.dispatch(new userActions.LoadUsers(page))
     
      this.store.subscribe(()=> {
     
        this.users$ = this.store.pipe(select(fromUser.getUsers))

        this.users$.subscribe((state:any) => {
        
          this.user = [state]
            
          this.total_pages = this.user[0].total_pages

          this.dataSource = new MatTableDataSource(this.user[0].data) as any

          this.dataSource.sort = this.sort;
          
          this.loading = false
        
        })

      })
          
  }

  ngOnInit(): void {
    //Call the function
    this.dispatchData(this.pageIndex)
  
  }

  //Dispatch data from the store
  applyFilter() {  
    
    // this.filterValue = this.filterValue.trim(); // Remove whitespace

    this.filterValue = this.filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    
    this.dataSource.filter = this.filterValue;
  
  }

  //Pagination
  onChangePage(pe:PageEvent) {

    this.pageIndex = pe.pageIndex;

    this.dispatchData(pe.pageIndex + 1)
    
  }

  //Open edit user dialog
  openEdit(element:any) {
    
    const dialogRef = this.dialog.open(UserEditComponent,{
    
      data : element
    
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
      console.log('The dialog was closed');
      
      this.dispatchData(this.pageIndex) 

    });
  }


  //Open create user dialog
  openCreate() {
    
    this.dialog.open(UserAddComponent);
    
  }

  //open delete user dialog
  openDelete(element:any) {

    const dialogRef = this.dialog.open(UserDeleteComponent,{

      data : element

    });
    
    dialogRef.afterClosed().subscribe(result => {
      
      console.log('The dialog was closed');
      
      this.dispatchData(this.pageIndex) 

    });

  }

}




