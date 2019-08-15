# Seed and setup backend

# Create venv
echo "Creating venv"
cd server
python3 -m venv venv
source venv/bin/activate

# install backend modules
echo "Installing python modules"
pip install -r requirements.txt

# seed app with 5 generated tasks
export FLASK_APP=application

flask fill-db 5

deactivate

cd ../client/app
npm install

cd ../../
