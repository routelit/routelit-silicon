import { manager } from "routelit-client";
import {
  Button,
  Checkbox,
  Expander,
  Text,
  TextInput,
  Panel,
  Link,
  Root,
  Sidebar,
  Main,
} from "./components";

manager.registerComponent("button", Button);
manager.registerComponent("checkbox", Checkbox);
manager.registerComponent("expander", Expander);
manager.registerComponent("text", Text);
manager.registerComponent("text-input", TextInput);
manager.registerComponent("panel", Panel);
manager.registerComponent("link", Link);
manager.registerComponent("root", Root);
manager.registerComponent("sidebar", Sidebar);
manager.registerComponent("main", Main);
manager.forceUpdate();
