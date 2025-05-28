import { Trash2 } from 'lucide-react';
import { posts } from '../../../constants/posts';

export function UserPosts() {
  return posts.map((post) => (
    <div key={post.id} className="mb-4 p-4 border rounded-lg shadow-sm">
      <p className="text-2xl text-[#007BFF]">{post.titulo}</p>
      <p className="text-md">{post.descricao}</p>
      <span className="flex justify-between items-center mt-2">
        <p className="text-[#6C757D] text-sm mt-2">{post.data}</p>
        <Trash2 className="cursor-pointer hover:text-red-600 transition-colors duration-200 " />
      </span>
    </div>
  ));
}
