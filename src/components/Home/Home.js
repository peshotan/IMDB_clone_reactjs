import React, {Component} from "react";
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Spinner from "../elements/Spinner/Spinner";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import "./Home.css";
import {BACKDROP_SIZE, IMAGE_BASE_URL, API_URL, API_KEY, POSTER_SIZE} from "../../config";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies : [],
            heroImage : null,
            loading : false,
            currentPage : 0,
            totalPages : 0,
            searchTerm : ""
        }
    }

    componentDidMount() {
        this.setState({loading : true});
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endPoint)

    };

    fetchItems = async (endPoint) => {
        let response = await fetch(endPoint);
        response  = await response.json();
        this.setState({
            movies : [...this.state.movies, ...response.results],
            currentPage : response.page,
            heroImage : this.state.heroImage || response.results[Math.floor(Math.random()*20)],
            loading : false,
            totalPages : response.total_pages
        });
    };

    loadMoreItems = () => {
        let endPoint = "";
        this.setState({loading : true});
        if (this.state.searchTerm === "") {
            endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`
        } else {
            endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&${this.state.currentPage + 1}`
        }

        this.fetchItems(endPoint)
    };

    searchItems = (searchTerm) => {
        console.log(searchTerm);
        let endPoint  = "";
        this.setState({
            movies : [],
            loading : true,
            searchTerm : searchTerm
        });

        if (searchTerm === "") {
            endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        } else {
            endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`
        }

        this.fetchItems(endPoint)
    };

    render() {
        let {heroImage, searchTerm, loading, movies} =  this.state;
        return(
            <div className="rmdb-home">
                {/*// Conditional render for HeroImage*/}
                {heroImage ?
                    <div>
                        <HeroImage
                            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                            title={this.state.heroImage.title}
                            text={heroImage.overview}
                        />
                        <SearchBar searchCallBack={this.searchItems}/>
                    </div>
                    :
                    null
                }

                <div className="rmdb-home-grid">
                    <FourColGrid
                        header={searchTerm ? 'Search Result' : 'Popular Movies'}
                        loading={loading}
                    >
                        {movies.map((movie,i) => {
                            return (
                                <MovieThumb
                                    key={i}
                                    clickable={true}
                                    image={movie.poster_path ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}` : "./images/no_image.jpg"}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            )
                        })}
                    </FourColGrid>
                </div>

                {this.state.loading ? <Spinner/> : null }

                {((this.state.currentPage < (this.state.totalPages + 1)) && !this.state.loading
                    ? <LoadMoreBtn loadMoreItems={this.loadMoreItems}/>
                    : null) }
            </div>
        )
    }
}

export default Home;