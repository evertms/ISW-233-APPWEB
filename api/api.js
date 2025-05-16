async function fetchMovies() {
    try {
        const response = await fetch('./data/fakedata.json');  // Cambiado de '../data/fakedata.json'
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

export { fetchMovies };