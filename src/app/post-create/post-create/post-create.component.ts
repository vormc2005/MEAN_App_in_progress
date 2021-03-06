import { Component, OnInit } from '@angular/core';

import { NgForm} from '@angular/forms'
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
 
  enteredTitle:string = ''
  enteredContent:string = ''
  
  constructor(public postsService:PostService) { }

  ngOnInit() {
   
  }
onAddPost(form:NgForm){
  if(form.invalid){
    return;
  }
  this.postsService.addPosts(form.value.title, form.value.content)
 form.resetForm()
  }
 
}


