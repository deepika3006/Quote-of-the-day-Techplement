from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

# Quotes data
quotes = [
    {"author": "Albert Einstein", "quote": "Life is like riding a bicycle. To keep your balance you must keep moving."},
    {"author": "Isaac Newton", "quote": "If I have seen further it is by standing on the shoulders of Giants."},
    {"author": "Yoda", "quote": "Do or do not. There is no try."},
    {"author": "Oscar Wilde", "quote": "Be yourself; everyone else is already taken."},
    {"author": "Confucius", "quote": "It does not matter how slowly you go as long as you do not stop."},
    {"author": "Mahatma Gandhi", "quote": "Be the change that you wish to see in the world."},
    {"author": "Mark Twain", "quote": "The secret of getting ahead is getting started."},
    {"author": "Winston Churchill", "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts."},
    {"author": "Nelson Mandela", "quote": "The greatest glory in living lies not in never falling, but in rising every time we fall."},
    {"author": "Steve Jobs", "quote": "Your time is limited, don't waste it living someone else's life."},
    {"author": "Eleanor Roosevelt", "quote": "The future belongs to those who believe in the beauty of their dreams."},
    {"author": "Dalai Lama", "quote": "Happiness is not something ready made. It comes from your own actions."},
    {"author": "Buddha", "quote": "The mind is everything. What you think you become."},
    # Add more quotes here if desired
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/random_quote')
def random_quote():
    quote = random.choice(quotes)
    return jsonify(quote)

@app.route('/search', methods=['GET'])
def search():
    author_name = request.args.get('author', '').lower()
    result = [quote for quote in quotes if author_name in quote['author'].lower()]
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)