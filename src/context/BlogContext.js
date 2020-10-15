import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch(action.type){
    case 'get_blogposts':
      return action.payload;
      //[...state, action.payload]를 할 필요가 없는 이유
      //에이피아이를 부르면 totall information을 가져오기 때문에
    case 'edit_blogpost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case 'delete_blogpost':
      return state.filter(blogPost => blogPost.id !== action.payload);
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogposts');
    //responst.data === [{}, {}, {}] list of blogposts, array of objects
    
    dispatch({type : 'get_blogposts', payload: response.data});
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', {title, content});

    if (callback){
      callback();
    }
  }; 
};
const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);
    
    dispatch({type:'delete_blogpost', payload: id})
  };
};
const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, {title, content});

    dispatch({ 
      type: 'edit_blogpost', 
      payload:{id, title, content}  
    });
    if (callback){
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer, 
  {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},
  []
);