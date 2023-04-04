import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap , of} from "rxjs";
@Injectable({
    providedIn: "root"
})

export class CommonService {
    constructor(private http:HttpClient){}


    getUniversity(): Observable<any>{
        if(localStorage.getItem('university')){
            let data:any = localStorage.getItem('university');
            return of(JSON.parse(data));
        }
        return this.http.get('http://universities.hipolabs.com/search').pipe(tap((res :any) => {
            res.map((data:any, i:number) => { 
                data.favorites = false;
                data.id = i;
             }
           );
            localStorage.setItem('university', JSON.stringify(res));
            return res;
        }));
    }

}