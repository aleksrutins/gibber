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

    let app = Route::new().at("/hello/:name", get(hello));
    Server::new(TcpListener::bind("127.0.0.1:3000"))
      .run(app)
      .await
}