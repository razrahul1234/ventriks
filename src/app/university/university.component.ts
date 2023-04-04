import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/university.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
   columns:Array<any> = [
    {header: 'Favorites', field:'favorites'},
    { header : 'Name', field: 'name'},
    { header : 'Country', field: 'country'},
    { header : 'Country Code', field: 'alpha_two_code'},
    { header : 'Website', field: 'web_pages'},
    {header: 'Mark as Favorites', field: 'mark'}
   ];
   values:Array<any>=[];
   tableValues:Array<any>=[];
   name:string='';
   country:string='';
   countryDropDown = ['','United Kingdom','China','France','United States','India','Canada','Uganda', 'Tunisia'];
   start=0;
   end = 10;
   itemsPerPageDropDown = [5,10,15,20,50,100];
//    pagination=[1];
   pageNumber=1;
   totalNumberOfPages = 0;
   itemsPerPage:number = 10;

    constructor(private service:CommonService){}

    ngOnInit(){
       this.fetchUniversity();
    }

    fetchUniversity(){
        this.service.getUniversity().subscribe((res : any) => {
            console.log(res);
            this.values = res;
            this.tableValues = res;
            this.calculateNumberOfPages();
            this.populateTableData();
        })
    }

    calculateNumberOfPages(){
        console.log(this.tableValues.length/this.itemsPerPage);
        this.totalNumberOfPages = Math.ceil(this.tableValues.length/this.itemsPerPage);
    }

    search(){
        console.log(this.name);
        console.log(this.country);
        let filteredValue = this.values.filter((data,i) => data.name.indexOf(this.name) > -1 && data.country.indexOf(this.country) >-1);
        this.tableValues = [...filteredValue];
        this.calculateNumberOfPages();
        this.tableValues = this.tableValues.filter((data,i) => i<10 ? true : false)
    }

    previousPage(){
        this.pageNumber = this.pageNumber - 1;
        this.populateTableData();
    }

    nextPage(){
        if((this.pageNumber * this.itemsPerPage) < this.values.length)
         this.pageNumber++;

         this.populateTableData();
    }

    changeItemsPerPage(){
        this.totalNumberOfPages = Math.ceil(this.values.length/this.itemsPerPage);
    }

    populateTableData(){
        let filteredData = this.values.filter((data, i) => {
            let start = (this.pageNumber-1)*this.itemsPerPage;
            let end =this.pageNumber*this.itemsPerPage;
            if(i >= start && i < end) 
                return true;
            else 
                return false;
        })
        this.tableValues = filteredData;
    }

    mark(id:any){
        this.tableValues.map(data => data.id == id ? (data.favorites = true) : false);
        this.values.map(data => data.id == id ? (data.favorites = true) : false);
        localStorage.setItem("university", JSON.stringify(this.values));

    }
}
