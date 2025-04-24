import { componentStore } from "routelit-client";
import {
  Button,
  Checkbox,
  Expander,
  Text,
  TextInput,
  Panel,
  Root,
  Sidebar,
  Main,
} from "./components";

componentStore.register("button", Button);
componentStore.register("checkbox", Checkbox);
componentStore.register("expander", Expander);
componentStore.register("text", Text);
componentStore.register("text-input", TextInput);
componentStore.register("panel", Panel);
componentStore.register("root", Root);
componentStore.register("sidebar", Sidebar);
componentStore.register("main", Main);

componentStore.forceUpdate();
