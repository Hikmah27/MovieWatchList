let movies = [];

function renderMovies(){
    const container = document.querySelector(".movie-cards");
    container.innerHTML ="";

    movies.forEach((movie, index) => {
        let statusText;
        if (movie.status === "watched"){
            statusText = `✔ Watched`
        } else{
            statusText  = `To Watch`
        }
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
        <h3>${movie.title}</h3>
        <p>${movie.genre} • ${movie.year}</p>
        <span class="${movie.status}">${statusText}</span>
        <div class="card-r">
            <button class="del-btn">
            <i class="fa fa-trash-can"></i>
            </button>
        </div>
        `;

        const delBtn = card.querySelector(".del-btn");
        delBtn.addEventListener("click", () => {
            movies.splice(index, 1); 
            renderMovies();          
        });

        container.appendChild(card);
    });
}

// for the add movie button, to fillin the title, genre, and year
const addMovieBtn = document.querySelector(".header-right button");
const quickAdd = document.querySelector("#quickAdd");
const qSave = document.querySelector("#qSave");

addMovieBtn.addEventListener("click", () => {
  quickAdd.classList.toggle("active");
});

qSave.addEventListener("click", () => {
  const title = document.querySelector("#qTitle").value;
  const genre = document.querySelector("#qGenre").value;
  const year = document.querySelector("#qYear").value;
  const status = document.querySelector("#qStatus").value;

  if (title === "") return;

  movies.push({ title: title, genre: genre, year: year, status: status });
  renderMovies();

  document.querySelector("#qTitle").value = "";
  document.querySelector("#qGenre").value = "";
  document.querySelector("#qYear").value = "";
  quickAdd.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Select all filter buttons and movie cards from the DOM
  const filterButtons = document.querySelectorAll('.filter-btn');
  const movieCards = document.querySelectorAll('.movie-card');

  // 2. Attach a click event listener to every filter button
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      
      // Remove the dark background highlight ('active' class) from the previous button
      document.querySelector('.filter-btn.active').classList.remove('active');
      
      // Add the highlight highlight to the button that was just clicked
      e.target.classList.add('active');

      // Get the value of the filter category ('all', 'watched', or 'to-watch')
      const targetCategory = e.target.getAttribute('data-filter');

      // 3. Loop through every movie card and decide whether to show or hide it
      movieCards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');

        // Condition: If "All" is selected OR the card status matches the filter category
        if (targetCategory === 'all' || targetCategory === cardStatus) {
          // Show the card
          card.style.display = 'flex'; // Use 'flex' to preserve your layout alignment
        } else {
          // Hide the card
          card.style.display = 'none';
        }
      });
    });
  });
});

// DARK MODE
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Change the button text
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
});