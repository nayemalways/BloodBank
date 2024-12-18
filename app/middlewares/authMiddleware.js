
export const authenticationMiddleware = async (req, res, next) => {
    console.log(`I am middleware`);
    next();
}