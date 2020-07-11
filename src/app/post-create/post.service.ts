import {PostObject} from './postobj.model'
import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import {Subject} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable({providedIn:'root'})
export class PostService{
    private posts: PostObject[]=[];
    private postsUpdated = new Subject <PostObject[]>()

constructor(private http:HttpClient){}

    getPosts(){
        // mking http request
        this.http.get<{message: string, posts: PostObject[]}>('http://localhost:3000/api/posts')
        .subscribe((postData)=>{
            this.posts = postData.posts;
            this.postsUpdated.next([...this.posts]);
        });
        //For withot back end request
        // return [...this.posts];
    }

    updatePostListener(){
       return  this.postsUpdated.asObservable()
    }

    addPosts(title:string, content:string){
        const post:PostObject ={id: null, title:title, content:content}
       
        //add to back end code 
        this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData)=>{
           console.log(responseData.message)
           this.posts.push(post)
           this.postsUpdated.next([...this.posts])
        })

    }
}