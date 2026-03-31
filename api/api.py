import time
from flask import Flask, request, jsonify, send_from_directory
import os
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# Absolute path for Docker volume
# api/api.py
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app/data/recipes.db'
db = SQLAlchemy(app)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    ingredients = db.Column(db.String(500), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True,
                            default='Delicious! Why not try it?')
    image_url = db.Column(db.String(500), nullable=True,
                       default="https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    servings = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Recipe(id={self.id}, title='{self.title}', description='{self.description}', servings={self.servings})"
    


@app.route('/api/recipes', methods=['GET'])
def get_all_recipes():
     recipes = Recipe.query.all()
     recipe_list = []
     for recipe in recipes:
          recipe_list.append({
            'id': recipe.id,             
            'title': recipe.title,             
            'ingredients': recipe.ingredients,             
            'instructions': recipe.instructions,             
            'description': recipe.description,             
            'image_url': recipe.image_url,             
            'servings': recipe.servings  
          })
     return jsonify(recipe_list)
     
@app.route('/api/recipes', methods=['POST'])
def add_recipe():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid or missing JSON, data POST error'}), 400
    required_fields = ['title', 'ingredients', 'instructions', 'servings', 'description', 'image_url']
    for field in required_fields:
        if field not in data or data[field] == "":
            return jsonify({'error': f"Missing required field must be filled: '{field}'"}), 400
   
    new_recipe = Recipe(
        title=data['title'],
        ingredients=data['ingredients'],
        instructions=data['instructions'],
        servings=data['servings'],
        description=data['description'],
        image_url=data['image_url']
    )

    db.session.add(new_recipe)
    db.session.commit()


    new_recipe_data = {
        'id': new_recipe.id,
        'title': new_recipe.title,
        'ingredients': new_recipe.ingredients,
        'instructions': new_recipe.instructions,
        'servings': new_recipe.servings,
        'description': new_recipe.description,
        'image_url': new_recipe.image_url
    }
    return jsonify({'message': 'Recipe ADDED! 🎉', 'recipe': new_recipe_data})


@app.route('/api/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({'error': 'Recipe not found'}), 404  
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid or missing JSON, data PUT error '}), 400
    required_fields = ['title', 'ingredients',
                      'instructions', 'servings', 'description', 'image_url']
    for field in required_fields:
        if field not in data or data[field] == "":
            return jsonify({'error': f"Missing required field: '{field}'"}), 400
        
    recipe.title = data['title']
    recipe.ingredients = data['ingredients']
    recipe.instructions = data['instructions']
    recipe.servings = data['servings']
    recipe.description = data['description']
    recipe.image_url = data['image_url']


    db.session.commit()
        
    updated_recipe = {
        'id': recipe.id,
        'title': recipe.title,
        'ingredients': recipe.ingredients,
        'instructions': recipe.instructions,
        'servings': recipe.servings,
        'description': recipe.description,
        'image_url': recipe.image_url
    }
    return jsonify({'message': 'Recipe updated successfully', 'recipe': updated_recipe})

@app.route('/api/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({"error": "Please ensure recipe hasn't been previously added!"}), 404
   
    db.session.delete(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe DELETED'})
    
@app.route('/')
def serve():
    return send_from_directory('build', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('build', path)

if __name__ == '__main__':
    # Create tables if they don't exist yet
    with app.app_context():
        db.create_all()

    # Start the Flask app
    app.run(host="0.0.0.0", port=5000, debug=True)