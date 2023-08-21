import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid'

import { Component } from 'react';
import { getImages } from './API';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton} from './Button/Button';
import { Modal } from './Modal/Modal';



export class App extends Component {
  state ={
    query: '',
    loading: false,
    page: 1,
    images: [],
   
    totalPages: 0,
    error: null,
  };

//   async componentDidMount(){
//   this.setState({loading: true}); 

//   const {query, page} = this.state;
//   const separatedQuery = query.split('/')[1];
  
//   try {
//   const newImages = await getImages({query: separatedQuery, page});
//   this.setState(prevState => ({
//   images: [...prevState.images, ...newImages],
//   hasMoreImages: newImages.length === 12,
//   totalPages: Math.ceil(newImages.totalHits / 12),
// }))
// } catch (error){
//   console.log(error);
//   toast.error("Something went wrong!", {
//     icon: "🤯"});
// }finally {
//   this.setState({loading: false})
// }

// }  

getImages = async () => {
  const { query, page } = this.state;
  // const perPage = 12;
  const separatedQuery = query.split('/')[1];

  try {
    const newImages = await getImages({query: separatedQuery}, page);
    this.setState((prevState) => ({
      images: [...prevState.images, ...newImages],
      hasMoreImages: newImages.length >= 20,
      totalPages: prevState.totalPages + 1,
      
    }));
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong!', {
      icon: '🤯',
    });
  } finally {
    this.setState({ loading: false });
  }
};

changeQuery = newQuery => {
this.setState({
  query:`${nanoid()}/${newQuery}`,
  images: [],
  page: 1,

  totalPages: 0,
})
}


componentDidUpdate(prevProps, prevState){
  const prevQuery = prevState.query;
  const newQuery =  this.state.query;

  const prevPage = prevState.page;
  const nextPage = this.state.page;

  if(prevQuery !== newQuery || prevPage !== nextPage){
// console.log(`HTTP request ${newQuery} and page ${nextPage}`)
this.getImages(this.state.query, this.state.page);
}
}

 
handleSubmit = evt => {
  evt.preventDefault();
  const newQuery = evt.target.elements.query.value.trim();
  if (newQuery === '') {
    toast(" Oops! Search query is empty!", {
       icon: "🦄"});
    return;
  }else{
    toast.success("We found some images for you!", {
      icon: "🚀"});
   
  }
  this.changeQuery(newQuery);
  evt.target.reset();
}


handleLoadMore = () => {
  if (this.state.query.trim() !== ''){
    this.setState(prevState => ({ page: prevState.page + 1 }), () => {
      this.getImages(); 
    });
  } else {
    toast("🦄 Oops! Search query is empty!");
  }
  
}


render () {
  const { images, error, loading, page, totalPages } = this.state;
//   console.log("images:", images);
// console.log("loading:", loading);
// console.log("page:", page);
// console.log("totalPages:", totalPages);
  return (
    <>
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        {error && !loading && (
          toast.error("Something went wrong!", {
            icon: "😲"})
        )}
        {totalPages === 0 && !images && (
           toast.error("Try again. Photos not found!", {
            icon: "🤯"})
        )}
        <ImageGallery images={images} />
        {images.length > 0 && !loading && page <= totalPages && (
       <LoadMoreButton onClick={this.handleLoadMore} />
        )}
        <Modal/>
      </div>
    <ToastContainer position="top-right" autoClose={2000}/>
    </>
    
  )
}
}
  
