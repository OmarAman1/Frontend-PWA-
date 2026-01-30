export default function Home(){
  return `
    ${NavBar()}
    <main class="container">
      ${MoviesCard()}
      <h2>Footer</h2>
    </main>
  `;
}
