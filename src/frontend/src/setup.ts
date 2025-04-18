import { manager } from "routelit-client";
import {
  Button,
  Checkbox,
  Expander,
  Text,
  TextInput,
  Panel,
  Link,
} from "./components";

manager.registerComponent("button", Button);
manager.registerComponent("checkbox", Checkbox);
manager.registerComponent("expander", Expander);
manager.registerComponent("text", Text);
manager.registerComponent("text-input", TextInput);
manager.registerComponent("panel", Panel);
manager.registerComponent("link", Link);
manager.forceUpdate();
