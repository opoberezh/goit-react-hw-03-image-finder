import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid'

import { Component } from 'react';
import { getImages } from '../API/API';
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
    hasMoreImages: true,
    totalPages: 0,
    error: null,
    isLastPage: false,
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



fetchImages = async () => {
  const { query, page } = this.state;
  const separatedQuery = query.split('/')[1];

  this.setState({ loading: true });
  try {
    const {hits, totalHits} = await getImages({ query: separatedQuery , page});
    this.setState(prevState => ({
      images: [...prevState.images, ...hits],
      isLastPage:
      prevState.images.length + hits.length >= totalHits,
    error: null,
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
  hasMoreImages: true,
  totalPages: 0,
  loading: false,
  isLastPage: false,
})
};


componentDidUpdate(prevProps, prevState){
  const prevQuery = prevState.query;
  const newQuery =  this.state.query;

  const prevPage = prevState.page;
  const nextPage = this.state.page;

  if(prevQuery !== newQuery || prevPage !== nextPage){
// console.log(`HTTP request ${newQuery} and page ${nextPage}`)
this.fetchImages()
}
};


handleLoadMore = () => {
  if (this.state.query.trim() !== ''){
    this.setState(prevState => ({ page: prevState.page + 1 }))
  } else {
    toast("🦄 Oops! Search query is empty!");
  }
  
};


  render() {
    const { images, error, loading, isLastPage, totalPages } = this.state;
  
    return (
      <>
        <div>
          <SearchBar onSubmit={this.changeQuery} />
          {loading && <Loader />}
          {error && !loading && (
            toast.error("Something went wrong!", {
              icon: "😲"
            })
          )}
          {totalPages === 0 && !images && (
            toast.error("Try again. Photos not found!", {
              icon: "🤯"
            })
          )}
          <ImageGallery images={this.state.images} />
          {images.length > 0 && !loading && !isLastPage && (
            <LoadMoreButton onClick={this.handleLoadMore} />
          )}
          <Modal />
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </>
    );
  }
};
 

  
