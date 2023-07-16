use std::env;

use poem::{get, handler, listener::TcpListener, web::Path, Route, Server};

#[handler]
fn hello(Path(name): Path<String>) -> String {
    format!("hello: {}", name)
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    if env::var_os("RUST_LOG").is_none() {
        env::set_var("RUST_LOG", "poem=debug");
    }
    tracing_subscriber::fmt::init();

    let port = env::var("PORT").map(|port_str| port_str.parse().expect("Failed to parse $PORT")).unwrap_or(3000u16);

    let app = Route::new().at("/hello/:name", get(hello));
    Server::new(TcpListener::bind(("0.0.0.0", port)))
      .run(app)
      .await
}