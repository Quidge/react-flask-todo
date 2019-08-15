# Seed and setup backend

# Create venv
cd server
python3 -m venv venv
source venv/bin/activate

# install backend
pip install requirements.txt

# seed app with 5 generated tasks and start the server
export FLASK_APP=application

flask fill-db 5

deactivate

cd ../client/app
npm install
