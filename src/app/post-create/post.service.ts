import {PostObject} from './postobj.model'
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'
import {HttpClient} from '@angular/common/http'


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
        this.posts.push(post)
        this.postsUpdated.next([...this.posts])
    }
}