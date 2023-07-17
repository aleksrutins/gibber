FROM ocaml/opam:debian-11-ocaml-5.0 AS build
RUN sudo apt-get install -y libev-dev libpq-dev libffi-dev libsqlite3-dev libssl-dev pkg-config
RUN opam install -y dune dream caqti-lwt caqti-driver-sqlite3 caqti-driver-postgresql ppx_rapper ppx_rapper_lwt tyxml
COPY . /src
WORKDIR /src
RUN sudo mkdir _build && sudo chmod 777 _build
RUN eval $(opam env) && dune build

FROM debian:11
RUN mkdir /app
WORKDIR /app
COPY --from=build /src/_build/install/default/bin/backend /app/gibber
COPY --from=build /src/assets /app/assets
ENTRYPOINT [ "/app/gibber" ]