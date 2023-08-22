import {FcSearch} from "react-icons/fc";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header, SearchForm, SearchFormButton, SearchFormInput } from "./SearchBar.styled";
import { Component } from "react";

export class  SearchBar extends Component{
    state = {
        query: '',
    };


handleSubmit = evt => {
    evt.preventDefault();

    const newQuery = this.state.query.trim();
    if (newQuery === '') {
      toast(" Oops! Search query is empty!", {
         icon: "🦄"});
      return;
    }else{
      toast.success("We found some images for you!", {
        icon: "🚀"}); 
    }
    this.props.onSubmit(newQuery);
    this.setState({ query: '' });
  };

  handleChange = evt => {
    this.setState({query: evt.target.value})
  };

  render() {
    const {query} = this.state;
    return(
            <Header>
                <SearchForm onSubmit={this.handleSubmit}>
                    <SearchFormButton type="submit">
                        <FcSearch size={22}/>
                    </SearchFormButton>

                    <SearchFormInput
                        type="text"
                        value={query}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                    />
                </SearchForm>
            </Header>
        )
  }

}
   





