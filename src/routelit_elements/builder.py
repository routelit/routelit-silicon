from typing import Callable, Optional, Sequence
from routelit.domain import RouteLitElement, RouteLitBuilder, AssetTarget


class RouteLitComponentsBuilder(RouteLitBuilder):
    static_assets_targets: Sequence[AssetTarget] = [
        {
            "package_name": "routelit_elements",
            "path": "static",
        }
    ]

    def _build_nested_builder(self, element: RouteLitElement) -> "RouteLitComponentsBuilder":
        builder = self.__class__(
            self.request,
            prefix=element.key,
            session_state=self.session_state,
            parent_element=element,
            parent_builder=self,
        )
        return builder
    
    def _init_sidebar(self) -> "RouteLitComponentsBuilder":
        new_element = self.create_element(
            name="sidebar",
            key="sidebar",
            props={},
        )
        return self._build_nested_builder(new_element)
    
    def _init_root(self) -> "RouteLitComponentsBuilder":
        new_element = self.create_element(
            name="root",
            key="root",
            props={},
        )
        return self._build_nested_builder(new_element)

    def _on_init(self):
        self._root = self._init_root()
        with self._root:
            self._sidebar = self._init_sidebar()
            self._main = self._init_main()
        self.parent_element = self._main.parent_element
        self.active_child_builder = self._main

    @property
    def sidebar(self) -> "RouteLitComponentsBuilder":
        return self._sidebar
    
    def _init_main(self) -> "RouteLitComponentsBuilder":
        new_element = self.create_element(
            name="main",
            key="main",
            props={},
        )
        return self._build_nested_builder(new_element)

    def link(
        self,
        href: str,
        text: str = "",
        replace: bool = False,
        is_external: bool = False,
        key: Optional[str] = None,
        **kwargs,
    ):
        self.add_non_widget(
            RouteLitElement(
                name="link",
                key=key or self._new_widget_id("link", href),
                props={
                    "href": href,
                    "replace": replace,
                    "is_external": is_external,
                    "text": text,
                    **kwargs,
                },
            )
        )

    def text(self, text: str, *, key: Optional[str] = None, **kwargs):
        self.add_non_widget(
            RouteLitElement(
                name="text",
                key=key or self._new_text_id("text"),
                props={"text": text, **kwargs},
            )
        )

    def button(
        self,
        text: str,
        *,
        key: Optional[str] = None,
        on_click: Optional[Callable[[], None]] = None,
        **kwargs,
    ) -> bool:
        button = self.create_element(
            name="button",
            key=key or self._new_widget_id("button", text),
            props={"text": text, **kwargs},
        )
        is_clicked, _ = self._get_event_value(button.key, "click")
        if is_clicked and on_click:
            on_click()
        return is_clicked

    def text_input(
        self,
        label: str,
        *,
        value: Optional[str] = None,
        placeholder: Optional[str] = None,
        key: Optional[str] = None,
        on_change: Optional[Callable[[str], None]] = None,
        **kwargs,
    ) -> str:
        component_id = key or self._new_widget_id("text-input", label)
        new_value = self.session_state.get(component_id, value)
        has_changed, event_value = self._get_event_value(
            component_id, "change", "value"
        )
        if has_changed:
            new_value = event_value
            self.session_state[component_id] = new_value
            if on_change:
                on_change(new_value)
        self.create_element(
            name="text-input",
            key=component_id,
            props={
                "label": label,
                "value": new_value,
                "placeholder": placeholder,
                **kwargs,
            },
        )
        return new_value or ""

    def checkbox(
        self,
        label: str,
        checked: bool = False,
        key: Optional[str] = None,
        on_change: Optional[Callable[[bool], None]] = None,
        **kwargs,
    ) -> bool:
        component_id = key or self._new_widget_id("checkbox", label)
        new_checked = self.session_state.get(component_id, checked)
        has_changed, event_checked = self._get_event_value(
            component_id, "change", "checked"
        )
        if has_changed:
            new_checked = event_checked
            self.session_state[component_id] = new_checked
            if on_change:
                on_change(new_checked)
        self.create_element(
            name="checkbox",
            key=component_id,
            props={"label": label, "checked": new_checked, **kwargs},
        )
        return new_checked

    def expander(
        self, title: str, *, open: Optional[bool] = None, key: Optional[str] = None
    ) -> "RouteLitComponentsBuilder":
        """
        Creates an expander component that can be used as both a context manager and a regular function call.
        ```python
        Usage:
            def build_index_view(rl: RouteLitBuilder):
                # Context manager style
                with rl.expander("Title"):
                    rl.text("Content")

                with rl.expander("Title", open=True) as exp0:
                    exp0.text("Content")

                # Function call style
                exp = rl.expander("Title")
                exp.text("Content")
        ```
        """
        new_key = key or self._new_widget_id("expander", title)
        new_element = self.create_element(
            name="expander",
            key=new_key,
            props={"title": title, "open": open},
        )
        return self._build_nested_builder(new_element)

    def link_area(
        self, href: str, *, key: Optional[str] = None, **kwargs
    ) -> "RouteLitComponentsBuilder":
        new_key = key or self._new_widget_id("link", href)
        new_element = self.create_element(
            name="link",
            key=new_key,
            props={"href": href, "className": "no-link-decoration", **kwargs},
        )
        return self._build_nested_builder(new_element)
