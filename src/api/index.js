import testRoutes from './testapis'; 
import prodRoutes from './prodapis'; 
import userRoutes from './userapis'; 
import evalRoutes from './evalapis'; 

let routes = [].concat(testRoutes, prodRoutes, userRoutes, evalRoutes);

export default routes;