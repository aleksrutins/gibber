let get_migrations = 
  [%rapper
    get_many
      {sql|
        SELECT @string{name}
        FROM gibber_migrations
      |sql}
    function_out
  ] (fun ~name -> name) ()

let count until =
  let stream, push = Lwt_stream.create () in
  let close () = push None in

  Lwt.async begin fun () ->
    let rec loop n =
      let%lwt () = Lwt_unix.sleep 0.5 in
      if n > until
      then (close (); Lwt.return_unit)
      else (push (Some n); loop (n + 1))
    in
    loop 1
  end;

  stream, close

let schema =
  let open Graphql_lwt.Schema in
  schema 
    [
      io_field "migrations"
        ~typ:(non_null (list (non_null string)))
        ~args:Arg.[]
        ~resolve:(fun info () ->
            Io.bind
              (Dream.sql info.ctx get_migrations)
              (fun value -> Io.return (Result.map_error (fun _err -> "") value))
          )
    ]
    ~subscriptions:[
      subscription_field "count"
        ~typ:(non_null int)
        ~args:Arg.[arg "until" ~typ:(non_null int)]
        ~resolve:(fun _info until ->
          Lwt.return (Ok (count until)))
    ]

let default_query =
  "subscription {\\n  count(until: 3)\\n}\\n"

let () =
  let port = Sys.getenv_opt "PORT" |> Option.map int_of_string_opt |> Option.join |> Option.value ~default:3000 in
  Dream.run ~interface:"0.0.0.0" ~port
  @@ Dream.logger
  @@ Dream.sql_pool (Sys.getenv_opt "DATABASE_URL" |> Option.value ~default:"sqlite3:db.sqlite")
  @@ Dream.sql_sessions
  @@ Dream.origin_referrer_check
  @@ Dream.router [
    Dream.any "/graphql" (Dream.graphql Lwt.return schema);
    Dream.get "/" (Dream.graphiql ~default_query "/graphql");
    Dream.get "/static/**" (Dream.static "assets")
  ]