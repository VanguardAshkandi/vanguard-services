import raids from './raids';
import users from './users';

// Have each service add its routes to the Express app
export default function(app) {
  raids(app);
  users(app);
}