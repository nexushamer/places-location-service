const UserController = rootRequire('./user/userController');
const PlaceLocatorController = rootRequire('./places-locator/placeLocatorController');

const router = (application) => {
    application.use('/api/user', UserController);
    application.use('/api/place-locator', PlaceLocatorController);
};

module.exports = router;