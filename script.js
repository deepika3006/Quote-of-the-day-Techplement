document.addEventListener('DOMContentLoaded', function() {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');

    // Fetch a random quote
    function fetchRandomQuote() {
        fetch('/random_quote')
            .then(response => response.json())
            .then(data => {
                if (data.quote && data.author) {
                    quoteText.textContent = "${data.quote}";
                    quoteAuthor.textContent = - ${data.author};
                } else {
                    quoteText.textContent = "No quote found.";
                    quoteAuthor.textContent = "";
                }
            })
            .catch(error => {
                console.error('Error fetching the quote:', error);
                quoteText.textContent = "Failed to fetch quote.";
                quoteAuthor.textContent = "";
            });
    }

    // Fetch quotes by author
    function fetchQuotesByAuthor(author) {
        fetch(/search?author=${author})
            .then(response => response.json())
            .then(data => {
                searchResults.innerHTML = '';
                if (data.length === 0) {
                    searchResults.innerHTML = '<p>No quotes found.</p>';
                } else {
                    data.forEach(quote => {
                        searchResults.innerHTML += <p>"${quote.quote}" - ${quote.author}</p>;
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching quotes by author:', error);
                searchResults.innerHTML = '<p>Failed to search for quotes.</p>';
            });
    }

    // Load a random quote on page load
    fetchRandomQuote();

    // Event listeners
    newQuoteBtn.addEventListener('click', fetchRandomQuote);
    searchBtn.addEventListener('click', () => {
        const author = searchInput.value.trim();
        if (author) {
            fetchQuotesByAuthor(author);
        }
    });
});