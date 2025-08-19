import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api-service.service';
import { Post } from '../test';

@Injectable({ providedIn: 'root' })
export class TestService {
  apiService = inject(ApiService);
  constructor() {}

  getPosts() {
    return this.apiService.get<Post[]>('/posts');
  }

  deletePost(id: number) {
    return this.apiService.delete(`/posts/${id}`);
  }
  getTodos() {
    return this.apiService.get<any[]>('/todos');
  }
}
