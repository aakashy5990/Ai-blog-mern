import React, { useEffect, useState } from 'react';
import { assets, comments_data } from '../assets/assets';
import { useParams } from 'react-router-dom';
import { blog_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

const Blog = () => {
  const { id } = useParams();

  const {axios} = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  const [name,setName] = useState('');  
  const [content,setContent] = useState('');

  const fetchBlogData = async () => {
    try{
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    }
    catch(error){
      toast.error(error.message)
    }
  };

  const fetchComments = async () => {
    try{
      const data = await axios.post('/api/blog/comments', {blogId: id});
      data.success ? setComments(data.comments) : toast.error (error.message);
    }catch(error){
      toast.error(error.message);
    }
  };

  
  const addComment = async (e) => {
    e.preventDefault();
    try{
      const { data } = await axios.post('/api/blog/add-comment', { blog:id, name, content, })
      if(data.success){
        toast.success(data.message);
        setName('');
        setContent('');
      }else{
        toast.error(data.error);
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);
  
  // Function to format date
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Function to get relative time (e.g., "2 hours ago")
  const getRelativeTime = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };

  return data ? (
    <div className="relative min-h-screen">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-10 opacity-50 w-full h-full object-cover"
      />
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Blog Header */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {data.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {formatDate(data.createdAt)}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {data.title}
                </h1>

                {data.subTitle && (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {data.subTitle}
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.user_icon}
                      alt="Author"
                      className="w-8 h-8"
                    />
                    <span className="text-gray-700 font-medium">
                      QuickBlog Team
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-sm">
                      Last updated: {formatDate(data.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div
              className="prose prose-lg max-w-none rich-text"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />

            {/* Blog Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm">
                    Published: {formatDate(data.createdAt)}
                  </span>
                  {data.isPublished && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Published
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <img
                      src={assets.comment_icon}
                      alt="Comment"
                      className="w-5 h-5"
                    />
                    <span className="text-sm">Comment</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <img
                      src={assets.star_icon}
                      alt="Like"
                      className="w-5 h-5"
                    />
                    <span className="text-sm">Like</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comment Section  */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Comments ({comments.length})
            </h3>

            {/* Add Comment Form */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Add a Comment
              </h4>
              <form onSubmit={addComment} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e)=> setName(e.target.value)}
                    value={name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Write your comment here..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Post Comment
                </button>
              </form>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map(comment => (
                <div
                  key={comment._id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-sm">
                          {comment.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h5 className="text-sm font-semibold text-gray-900">
                          {comment.name}
                        </h5>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                        {comment.isApproved ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            Approved
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                            Pending
                          </span>
                        )}
                        <div className="ml-auto text-xs text-gray-400 font-medium">
                          {getRelativeTime(comment.createdAt)}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors text-sm">
                          <img
                            src={assets.comment_icon}
                            alt="Reply"
                            className="w-4 h-4"
                          />
                          Reply
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors text-sm">
                          <img
                            src={assets.star_icon}
                            alt="Like"
                            className="w-4 h-4"
                          />
                          Like
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {comments.length === 0 && (
              <div className="text-center py-8">
                <img
                  src={assets.comment_icon}
                  alt="No comments"
                  className="w-16 h-16 mx-auto mb-4 opacity-50"
                />
                <p className="text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            )}
          </div>

          {/* Related Articles Section */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blog_data
                .filter(
                  blog =>
                    blog.category === data.category && blog._id !== data._id
                )
                .slice(0, 3)
                .map(relatedBlog => (
                  <div
                    key={relatedBlog._id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium mb-2 inline-block">
                        {relatedBlog.category}
                      </span>
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedBlog.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {relatedBlog.subTitle}
                      </p>
                      <span className="text-gray-500 text-xs">
                        {formatDate(relatedBlog.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : <Loader/>
};

export default Blog;
