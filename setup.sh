###
# Setup backend
###
echo ""
echo "Setting up backend"
echo ""

echo "Creating venv"
cd server
python3 -m venv venv
source venv/bin/activate

echo "Installing python modules"
pip install -r requirements.txt
export FLASK_APP=application

echo "Seeding db with 5 randomly generated tasks"
flask fill-db 5

deactivate
echo ""
echo "Finished setting up backend"
echo ""

###
# Setup frontend
###
echo ""
echo "Setting up frontend"
echo ""

cd ../client/app
npm install

cd ../../
echo ""
echo "Finished setting up frontend"
echo ""
