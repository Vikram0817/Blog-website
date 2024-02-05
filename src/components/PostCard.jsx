import React from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({
    $id, title, featuredImage
}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full rounded-xl bg-gray-100'>
                <div className='w-full flex justify-center mb-4'>
                    <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl'></img>
                </div>
                <h2 className='text-xl font-bold'></h2>
            </div>
        </Link>
    );
}

export default PostCard;