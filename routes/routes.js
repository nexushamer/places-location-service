const UserController = require('../user/userController');
const PlaceLocatorController = require('../places-locator/placeLocatorController');

const router = (application) => {
    application.use('/api/user', UserController);
    application.use('/api/place-locator', PlaceLocatorController);
};

module.exports = router;