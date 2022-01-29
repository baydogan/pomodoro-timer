import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookReader,
  faClock,
  faCog,
  faTasks,
  faUserCircle,
  faUserSecret,
  faStepForward,
  faRedoAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret, faClock, faCog, faTasks, faUserCircle, faBookReader, faStepForward, faRedoAlt, faTimes);
export default (app) => {
  app.component("fa", FontAwesomeIcon);
};
