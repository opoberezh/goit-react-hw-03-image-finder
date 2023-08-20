import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid'

import { Component } from 'react';
import { getImages } from './API';
import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';




export class App extends Component {
  state ={
    query: '',
    images: [],
    page: 1,
    loading: false,
  }

  async componentDidMount(){
  this.setState({loading: true});
  try {
    const {query, page} = this.state;
   
  const images = await getImages(query, page);
  this.setState({
  images,
})
} catch (error){
  console.log(error);
  toast.error("Something went wrong!", {
    icon: "🤯"});
}finally {
  this.setState({loading: false})
}

}  

changeQuery = newQuery => {
this.setState({
  query:`${nanoid()}/${newQuery}`,
  images: [],
  page: 1,
  
})
}


componentDidUpdate(pervProps, prevState){
  const prevQuery = prevState.query;
  const newQuery =  this.state.query;

  const prevPage = prevState.page;
  const nextPage = this.state.page;

  if(prevQuery !== newQuery || prevPage !== nextPage){
console.log(`HTTP request ${newQuery} and page ${nextPage}`)
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
     this.setState(prevState =>({page: prevState.page +1}))
  }else {
    toast("🦄 Oops! Search query is empty!");
  }
 
};


render () {
   
  return (
    <div>
      <SearchBar onSubmit={this.handleSubmit}/> 
      {this.state.loading ? <Loader/> : null}
      <div>Gallery</div>

      
        <button onClick={this.handleLoadMore}>Load more</button>
       
      
      <ToastContainer position="top-right" autoClose={2000}/>
    </div>
  )
};
}
  
