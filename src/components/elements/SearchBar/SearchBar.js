import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import "./SearchBar.css";

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : ""
        }
    }

    timeOut = null;

    handleChange = (e) => {
        this.setState({value : e.target.value});
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(()=> {
            this.props.searchCallBack(this.state.value)
        }, 500)
    };

    render() {
        return (
            <div className="rmdb-searchbar">
                <div className="rmdb-searchbar-content">
                    <FontAwesome
                        className="rmdb-fa-search"
                        name="search"
                        size="2x"
                    />
                    <form onSubmit={()=>console.log("submit!!!")}>
                        <input
                            type="text"
                            className="rmdb-searchbar-input"
                            placeholder="Search"
                            onChange={this.handleChange}
                            value={this.state.value}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchBar;