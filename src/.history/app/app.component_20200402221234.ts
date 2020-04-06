import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

export interface EmployeeData {
  Id: string;
  EmpName: string; 
  Color: string;
  Hours: number;
}

const FAVORITE_COLORS: string[] = ['gray', 'black', 'navy', 'blue', 'teal', 'green', 'purple',
  'fuchsia', 'lime', 'olive', 'aqua', 'yellow', 'orange', 'red', 'maroon'];
const EMP_NAMES: string[] = ['Robert', 'Jing Jo', 'Thomas', 'Peter', 'Sam', 'Jack',
  'Charlie', 'Maria', 'Julia', 'Albert', 'Arthur', 'James',
  'Simran', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularmat';

  displayedColumns: string[] = ['Id', 'EmpName', 'Color', 'Hours'];
  dataSource: MatTableDataSource<EmployeeData>;

  emplist: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 employees
    this.emplist = Array.from({ length: 100 }, (_, k) => getEmployees(k + 1));  
    // Assign the data to the data source
    this.dataSource = new MatTableDataSource(this.emplist);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

//This function will create employee
function getEmployees(id: number): EmployeeData {
  const name =
  EMP_NAMES[Math.round(Math.random() * (EMP_NAMES.length - 1))] + ' ' +
  EMP_NAMES[Math.round(Math.random() * (EMP_NAMES.length - 1))].charAt(0) + '.';

  return {
    Id: id.toString(),
    EmpName: name,
    Color: FAVORITE_COLORS[Math.round(Math.random() * (FAVORITE_COLORS.length - 1))],
    Hours: 8
  };
}
