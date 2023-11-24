import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, interval, of, tap } from 'rxjs';
import { TableSettingsComponent } from '../../common/table-settings/table-settings.component';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TableSettingsComponent,
  ],
  providers: [
    UserService,
  ]
})
export class DashboardComponent {

  users$: Observable<User[]> = of([]);

  userService = inject(UserService);

  // dialog: MatDialog = inject(MatDialog);

  // pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  // limit = {page: 1, limit: this.pageSizeOptions[0]};

  // users$ = this.userService.list$.pipe(
  //   tap( users => this.dataSource.data = users ),
  //   tap( users => {
  //     if (this.paginator) {
  //       const to = setTimeout( () => {
  //         clearTimeout(to);
  //         this.paginator.length = this.totalCount;
  //         this.paginator.pageIndex = this.limit.page - 1;
  //         this.paginator.pageSize = this.limit.limit;
  //       });
  //     }
  //   })
  // );

  // count$ = this.userService.count$;

  // totalCount: number = 0;

  // readonly initialColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'address'];

  // displayedColumns: string[] = [...this.initialColumns];

  // dataSource = new MatTableDataSource<User>([]);

  // filterGroup: FormGroup = new FormGroup({});

  // filterInited: boolean = false;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  // @ViewChildren(MatInput) filterInputs!: QueryList<MatInput>;

  // ngAfterViewInit() {
  //   this.userService.getAll(this.limit);
  //   this.dataSource.paginator = this.paginator;
  //   this.count$.subscribe( count => this.totalCount = count );

  //   this.displayedColumns.forEach( c => this.filterGroup.addControl(
  //     c, new FormControl(''))
  //   );

  //   setTimeout( () => this.filterInited = true );

  //   setTimeout( () => {
  //     this.displayedColumns[0] = 'firstName';
  //     this.displayedColumns[1] = 'id';
  //   });
  // }

  // onFilterStart(): void {
  //   const values = this.filterGroup.value;
  //   this.userService.filter(values, this.limit);
  // }

  // onPaginatorChange(ev: PageEvent): void {
  //   this.limit = {page: ev.pageIndex + 1, limit: ev.pageSize};
  //   this.userService.getAll(this.limit);
  // }

  // drop(ev: CdkDragDrop<string>): void {
  //   const target = ev.container.data;
  //   const elem = ev.previousContainer.data;
  //   const elemIndex = this.displayedColumns.findIndex( e => e === elem );
  //   const targetIndex = this.displayedColumns.findIndex( e => e === target );
  //   [this.displayedColumns[elemIndex], this.displayedColumns[targetIndex]]
  //     = [this.displayedColumns[targetIndex], this.displayedColumns[elemIndex]];
  // }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(TableSettingsComponent, {
  //     data: { cols: this.initialColumns },
  //     panelClass: 'table--dialog'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.displayedColumns = result;
  //   });
  // }

}
