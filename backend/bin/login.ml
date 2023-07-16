open Tyxml

let login_page req =
  let open Html in
  html
    (head (title (txt "Log In | Gibber")) [])
    (body [

    ])
  
let login_action req =
  match Dream.form req with
  _ -> ()


let router inner_handler request =
  (*let%lwt () = Dream.invalidate_session request in*)
  ()