'use client';

import { useState } from 'react';
import { UserComments } from '../user-comments';
import { UserPosts } from '../user-posts';
import { UserComplaints } from '../user-complaints';
import { useAuth } from '@/global/context/useAuth';
import { UserNotices } from '../user-notices';

export function Tabs() {
  const [activeTab, setActiveTab] = useState<'comentarios' | 'posts' | 'denuncias' | 'formularios' | 'noticias'>(
    'comentarios'
  );
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <div className="flex overflow-x-auto no-scrollbar gap-6 text-xl text-azure-primary font-medium border-b border-gray-300 px-2 sm:justify-center">
        <button
          className={`cursor-pointer whitespace-nowrap ${activeTab === 'comentarios' ? 'border-b-2 border-azure-primary pb-1' : ''}`}
          onClick={() => setActiveTab('comentarios')}
        >
          Comentários
        </button>
        {(user.role === 'student' || user.role === 'admin') && (
          <button
            className={`cursor-pointer whitespace-nowrap ${activeTab === 'posts' ? 'border-b-2 border-azure-primary pb-1' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
        )}
        {(user.role === 'admin' || user.role === 'professor') && (
          <>
            <button
              className={`cursor-pointer whitespace-nowrap ${activeTab === 'denuncias' ? 'border-b-2 border-azure-primary pb-1' : ''}`}
              onClick={() => setActiveTab('denuncias')}
            >
              Reclamações
            </button>

            <button
              className={`cursor-pointer whitespace-nowrap ${activeTab === 'noticias' ? 'border-b-2 border-azure-primary pb-1' : ''}`}
              onClick={() => setActiveTab('noticias')}
            >
              Notícias
            </button>
          </>
        )}
      </div>

      <div className="mt-6 w-full">
        {activeTab === 'comentarios' && <UserComments />}
        {activeTab === 'posts' && (user.role === 'student' || user.role === 'admin') && (
          <UserPosts />
        )}
        {activeTab === 'denuncias' && <UserComplaints />}
        {activeTab === 'noticias' && (user.role === 'admin' || user.role === 'professor') && <UserNotices />}
      </div>
    </>
  );
}
