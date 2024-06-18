import requests
import json

# API endpoint
api_url = "http://localhost:3000/api/add-users"

# Read test data from JSON file
with open('test_data.json', 'r') as file:
    test_data = json.load(file)

# Send POST request to add user
response = requests.post(api_url, data=json.dumps(test_data), headers={"Content-Type": "application/json"})

if response.status_code == 200 :
    print("User added successfully!")
else:
    print(f"Error adding user: {response.status_code} - {response.text}")