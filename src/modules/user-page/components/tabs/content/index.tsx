import { useState } from 'react';
import { UserComments } from '../user-comments';
import { UserPosts } from '../user-posts';
import { UserComplaints } from '../user-complaints';
import { UserForms } from '../user-forms';

export function Tabs() {
  const [activeTab, setActiveTab] = useState<'comentarios' | 'posts' | 'denuncias' | 'formularios'>(
    'comentarios'
  );

  return (
    <>
      <div className="flex overflow-x-auto no-scrollbar gap-6 text-xl text-[#007BFF] font-medium border-b border-gray-300 px-2 sm:justify-center">
        <button
          className={`cursor-pointer whitespace-nowrap ${activeTab === 'comentarios' ? 'border-b-2 border-[#007BFF] pb-1' : ''}`}
          onClick={() => setActiveTab('comentarios')}
        >
          Comentários
        </button>
        <button
          className={`cursor-pointer whitespace-nowrap ${activeTab === 'posts' ? 'border-b-2 border-[#007BFF] pb-1' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button
          className={`cursor-pointer whitespace-nowrap ${activeTab === 'denuncias' ? 'border-b-2 border-[#007BFF] pb-1' : ''}`}
          onClick={() => setActiveTab('denuncias')}
        >
          Denúncias
        </button>
        <button
          className={`cursor-pointer whitespace-nowrap ${activeTab === 'formularios' ? 'border-b-2 border-[#007BFF] pb-1' : ''}`}
          onClick={() => setActiveTab('formularios')}
        >
          Formulários
        </button>
      </div>

      <div className="mt-6">
        {activeTab === 'comentarios' && <UserComments />}
        {activeTab === 'posts' && <UserPosts />}
        {activeTab === 'denuncias' && <UserComplaints/>}
        {activeTab === 'formularios' && <UserForms/>}
      </div>
    </>
  );
}
