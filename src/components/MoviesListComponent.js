import React, { Component } from "react";
import MovieItemComponent from "./MovieItemComponent";

function searchingFor(term) {
  return function (x) {
    return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}
class MoviesListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMovies: [
        {
          name: "Ký Sinh Trùng",
          description:
            "A poor family, the Kims, con their way into becoming...",
          rateScore: 3,
          actors: [],
          releaseDate: "21 June 2019 (Vietnam)",
          imageUrl:
            "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
          isLiked: false,
        },
        {
          name: "Hố Sâu Đói Khát",
          description:
            "A vertical prison with one cell per level. Two people per cell. One only food...",
          rateScore: 4,
          actors: [],
          releaseDate: "8 November 2019 (Spain)",
          imageUrl:"https://m.media-amazon.com/images/M/MV5BOTMyYTIyM2MtNjQ2ZC00MWFkLThhYjQtMjhjMGZiMjgwYjM2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
          isLiked: false,
        },
        {
          name: "Quý Ông Thế Giới Ngầm",
          description:
            "An American expat tries to sell off his highly profitable marijuana empire...",
          rateScore: 2,
          actors: [],
          releaseDate: "21 February 2020 (Vietnam)",
          imageUrl:
            "https://m.media-amazon.com/images/M/MV5BMTlkMmVmYjktYTc2NC00ZGZjLWEyOWUtMjc2MDMwMjQwOTA5XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_UX182_CR0,0,182,268_AL_.jpg",
          isLiked: false,
        },
        {
          name: "1917",
          description:
            "April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned...",
          rateScore: 5,
          actors: [],
          releaseDate: "21 February 2018 (Vietnam)",
          imageUrl:
            "https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_UX182_CR0,0,182,268_AL_.jpg",
          isLiked: false,
        },
        {
          name: "Joker (2019)",
          description:
            "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society....",
          rateScore: 4,
          actors: [],
          releaseDate: "21 February 2019 (Vietnam)",
          imageUrl:
            "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
          isLiked: false,
        },
        {
          name: "La Casa de Papel",
          description:
            "A group of unique robbers assault the Factory of Moneda and Timbre to carry out the most perfect robbery in the history of Spain and take home 2.4 billion euros.",
          rateScore: 5,
          actors: [],
          releaseDate: "4 March 2020 (Vietnam)",
          imageUrl:
            "https://m.media-amazon.com/images/M/MV5BZTNiY2FiYzktNWNmMi00YjMzLTkwMWItMGE3ZDc5OWYzODIyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
          isLiked: false,
        }
      ],
      listMoviesLiked: [],
      term: "",
    };
    this.searchHandler = this.searchHandler.bind(this);
  }
  searchHandler(event) {
    this.setState({ term: event.target.value });
  }

  onChangeStatus = (id) => {
    console.log("movie id:" + id);
    this.state.listMovies.map((item, index) => {
      if (index === id) {
        item.isLiked = !item.isLiked;
        console.log("status: " + item.isLiked);
        this.state.listMovies[id] = item;
        this.setState({
          listMovies: this.state.listMovies,
        });

        localStorage.setItem("list", JSON.stringify(this.state.listMovies));
      }
    });
  };

  componentWillMount() {
    let list = this.state.listMovies;
    if (localStorage.getItem("list") != null) {
      list = JSON.parse(localStorage.getItem("list"));
      this.setState({
        listMovies: list,
      });
    }
  }

  componentDidCatch() {
    let list = JSON.parse(localStorage.getItem("list"));
    this.setState({
      listMovies: list,
    });
  }

  render() {
    return (
      <div>
        <div className="row col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-2">
          <div className="input-group">
            <input
              name="keyword"
              type="text"
              className="form-control mb-3"
              placeholder="Nhập từ khóa..."
              onChange={this.searchHandler}
            />
          </div>
        </div>
        <div className="row">
          {this.props.statusLiked === true
            ? this.state.listMovies.map((movie, index) => {
                if (movie.isLiked)
                  return (
                    <MovieItemComponent
                      key={index}
                      id={index}
                      name={movie.name}
                      description={movie.description}
                      rateScore={movie.rateScore}
                      actors={movie.actors}
                      releaseDate={movie.releaseDate}
                      imageUrl={movie.imageUrl}
                      isLiked={movie.isLiked}
                      onUpdateStatus={this.onChangeStatus}
                      onChange={this.onChangeStatus}
                    />
                  );
              })
            : this.state.listMovies
                .filter(searchingFor(this.state.term))
                .map((movie, index) => {
                  return (
                    <MovieItemComponent
                      key={index}
                      id={index}
                      name={movie.name}
                      description={movie.description}
                      rateScore={movie.rateScore}
                      actors={movie.actors}
                      releaseDate={movie.releaseDate}
                      imageUrl={movie.imageUrl}
                      isLiked={movie.isLiked}
                      onUpdateStatus={this.onChangeStatus}
                      onChange={this.onChangeStatus}
                    />
                  );
                })}
        </div>
      </div>
    );
  }
}

export default MoviesListComponent;
