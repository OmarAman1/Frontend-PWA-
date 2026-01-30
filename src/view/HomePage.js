import MoviesCard from "./moviesCard";
import NavBar from "./NavbarPage";

export default function Home(){

  return(
    `${NavBar()}
    <main class= "container">
     ${MoviesCard()}
      <h2>Footer</h2>
      </main>
    `
  )
}

