from flask import Flask

from routelit import RouteLit
from routelit_flask import RouteLitFlaskAdapter
from routelit_silicon import RLBuilder

app = Flask(__name__)

routelit = RouteLit(BuilderClass=RLBuilder)
routelit_adapter = RouteLitFlaskAdapter(
    routelit,
    ### TO USE LOCAL VITE DEV SERVER, UNCOMMENT THE FOLLOWING LINES
    # run_mode="dev_components",
    # local_components_server="http://localhost:5173"
).configure(app)


def view(ui: RLBuilder):
    ui.set_config(use_sidebar=True)
    with ui.sidebar:
        ui.title("Sidebar")

    ui.title("Main")
    ui.text("Hello, world! from main")

    ui.sidebar.text("Hello, world! from sidebar")

    if 'counter' not in ui.session_state:
        ui.session_state.counter = 0
    if ui.button("Click me", event_name="submit"):
        ui.session_state.counter += 1
    ui.text(f"Button clicked {ui.session_state.counter} times")

    if ui.button("Reset counter"):
        ui.session_state.pop("counter", None)
        ui.rerun()


@app.route("/", methods=["GET", "POST"])
def index():
    return routelit_adapter.response(view)


if __name__ == "__main__":
    app.run(debug=True)
