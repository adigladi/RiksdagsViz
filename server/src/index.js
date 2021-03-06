//https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
//Follow guide to deploy on heruko
import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import path from 'path'
import config from './config/config'
import expressConfig from './config/expressConfig';
import routesConfig from './config/routesConfig'
const staticFiles = express.static(path.join(__dirname, '../../client/build'))



class Server{
  constructor(){
    this.app = express()
    this.config = config
    this.init()
  }

  init(){
    this.app.use(morgan('dev'));
    this.app.use(cors())
    this.app.use(staticFiles)
    expressConfig(this.app);
    routesConfig(this.app)
    this.app.use('/*', staticFiles)

    this.app.listen(process.env.PORT || 5000, () => {
      console.log(`[Server] listening on port 5000`);
    });
   
  //   mongoose.connect(
  //     this.config.db, {useNewUrlParser: true},
  //     err => {
  //       if(err) {
  //         console.log(`[MongoDB] Failed to connect. ${err}`);
  //       }
  //       else{
  //         console.log(`[MongoDB] connected: ${this.config.db}`);
  //         routesConfig(this.app)
  //         this.app.listen(this.config.apiPort, () => {
  //           console.log(`[Server] listening on port ${this.config.apiPort}`);
  //         });
  //       }
  //     } 
  // )
  }
}

export default new Server().app