basicIngreds = ["chicken", "chick", "ham", "cheese", "blue", "flour", "water", "butter", "sugar", "olive oil", "vegetable oil", "salt", "pepper", "garlic powder", 'onion powder', 'cumin', 'paprika', 'oregano', 'thyme', 'basil', 'rosemary', 'cinnamon', 'nutmeg']
row = "['buttermilk', 'chicken wings', 'all-purpose flour', 'salt', 'paprika', 'cayenne pepper', 'butter', 'hot sauce', 'ground pepper', 'garlic powder', 'greek yogurt', 'blue cheese', 'cinnamon sugar']"
ingredArr = basicIngreds
newArr = ingredArr.copy()
commas = row.count(",")
elemNum = commas+1

for i in ingredArr:
    if i in newArr:
        for elem in ingredArr:
            if i in elem and elem in newArr:
                newArr.remove(elem)
      
        newArr.append(i)

# Use a set to store matched ingredient variations
matched_ingredients = set()

for ingred in newArr:
    if ingred in row:
        for word in row.split(","):
            if ingred in word:
                matched_ingredients.add(word.strip())


total_matched_count = len(matched_ingredients)
print(elemNum-total_matched_count)

