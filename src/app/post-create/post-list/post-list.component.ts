import { Component, OnInit, OnDestroy } from '@angular/core';
import {PostObject} from '../postobj.model'
import { PostService } from '../post.service';
import{Subscription} from 'rxjs'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts=[ 
  //    {title:"First Post", content: "This is the first post"},
  //  {title:"Second Post", content: "This is the Second post"},
  //  {title:"Third Post", content: "This is the Third post"}
  // ]
   posts:PostObject[]=[]
   private postsSub: Subscription;

  constructor(public postsService:PostService) { }

  ngOnInit() {
     this.postsService.getPosts()
    this.postsSub = this.postsService.updatePostListener()
    .subscribe((posts:PostObject[])=>{
         this.posts = posts;   
    });
  }
  
  onDelete(postId:string){
    this.postsService.deletePosts(postId)
  }

  ngOnDestroy(){
  this.postsSub.unsubscribe()
  }

}
