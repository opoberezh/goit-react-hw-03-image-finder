import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { nanoid } from 'nanoid'
import { Component } from 'react';




export class App extends Component {
  state ={
    query: '',
    images: [],
    page: 1,
    // loading: false,
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
      <form onSubmit={evt => {
        evt.preventDefault();
        const newQuery = evt.target.elements.query.value.trim();
        if (newQuery === '') {
          toast("🦄 Oops! Search query is empty!");
          return;
        }
        this.changeQuery(newQuery);
        evt.target.reset();
      }}
      >
        <input type="text" name="query"/>
        <button type="submit">Submit</button>
      </form>
      <div>Gallery</div>
      <button onClick={this.handleLoadMore}>Load more</button>
      <ToastContainer position="top-center" autoClose={2000}/>
    </div>
  )
};
}
  
