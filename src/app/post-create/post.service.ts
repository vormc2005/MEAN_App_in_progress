import {PostObject} from './postobj.model'
import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import {Subject} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators'


@Injectable({providedIn:'root'})
export class PostService{
    private posts: PostObject[]=[];
    private postsUpdated = new Subject <PostObject[]>()

constructor(private http:HttpClient){}

    getPosts(){
        // mking http request
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData)=>{
        return postData.posts.map(post =>{
            return {
                title: post.title,
                content: post.content,
                id: post._id
            }
        })
        }))
        //Before getting _id from database
        // .subscribe((postData)=>{
        //     this.posts = postData.posts;
        //     this.postsUpdated.next([...this.posts]);
        // });
        // After ID is transformed
        .subscribe((transformedPosts)=>{
            this.posts = transformedPosts;
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
        this.http
        .post<{message: string, postId:string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData)=>{
        const id = responseData.postId
        post.id = id
           console.log(responseData.message)
           this.posts.push(post)
           this.postsUpdated.next([...this.posts])
        })

    }

    deletePosts(postID: string){
        this.http.delete("http://localhost:3000/api/posts/" + postID)
        .subscribe(()=>{
            console.log("Deleted")

            //Deleting from the DOM
            
            const updatesPosts = this.posts.filter(post => post.id !== postID);
            this.posts = updatesPosts;
            this.postsUpdated.next([...this.posts])
            })
        }

    }
