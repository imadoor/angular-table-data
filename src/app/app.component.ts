import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RatesService } from './rates.service';
import {Rate} from './Rate'
import { ApiService } from './api.service';
import { ThrowStmt } from '@angular/compiler';


// export interface EmployeeData {
//   Id: string;
//   EmpName: string; 
//   Color: string;
//   Hours: number;
// }

// const FAVORITE_COLORS: string[] = ['gray', 'black', 'navy', 'blue', 'teal', 'green', 'purple',
//   'fuchsia', 'lime', 'olive', 'aqua', 'yellow', 'orange', 'red', 'maroon'];
// const EMP_NAMES: string[] = ['Robert', 'Jing Jo', 'Thomas', 'Peter', 'Sam', 'Jack',
//   'Charlie', 'Maria', 'Julia', 'Albert', 'Arthur', 'James',
//   'Simran', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularmat';
  public rates: Rate[];
  displayedColumns: string[] = ['name', 'code', 'rate'];
  dataSource: MatTableDataSource<Rate>;

  emplist: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService) {


    // Create 100 employees
    //this.emplist = Array.from({ length: 100 }, (_, k) => getEmployees(k + 1));  
    // Assign the data to the data source
    
  }

  ngOnInit() {
    this.apiService.getAllRates().subscribe( (data: Rate[]) =>{
      this.rates = data;
      console.log(this.rates);
      this.dataSource = new MatTableDataSource(this.rates);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      //this.rates = data;

    },()=>{
          this.dataSource.filterPredicate = function(data, filter: string): boolean {
          console.log("Filter: " + filter);
          return data.code.toLowerCase().includes(filter) || data.name.toLowerCase().includes(filter) || data.rate.toString() === filter;
        };
    });



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

  customFilterPredicate(data, filter: string): boolean {

    return data.code.toLowerCase().includes(filter) || data.name.toLowerCase().includes(filter) || data.rate.toString() === filter;
  };
}

//This function will create employee
// function getEmployees(id: number): EmployeeData {
//   const name =
//   EMP_NAMES[Math.round(Math.random() * (EMP_NAMES.length - 1))] + ' ' +
//   EMP_NAMES[Math.round(Math.random() * (EMP_NAMES.length - 1))].charAt(0) + '.';

//   return {
//     Id: id.toString(),
//     EmpName: name,
//     Color: FAVORITE_COLORS[Math.round(Math.random() * (FAVORITE_COLORS.length - 1))],
//     Hours: 8
//   };
// }
