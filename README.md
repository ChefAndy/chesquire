# Chesquire

This is going to be a legal research chat app, the primary purpose of which is to facilitate group analysis of legal opinions. It's written in Elixir and Javascript, runs on the Phonenix framework, and will be powered by [`cap-api`](http://capapi.org). It is a project of the [`Library Innovation Lab at Harvard Law School`](http://lil.law.harvard.edu/)

This app used [`Tensor Programming's Phoenix Chat App Tutorial #3`](https://github.com/tensor-programming/phoenix-tut-3) as a template.  Thanks dude!

To hack on it: 

  * Install [`erlang, elixir, hex, and phoenix`](http://www.phoenixframework.org/docs/installation)
  * Install dependencies with `mix deps.get`
  * Config database connection in `chesquire/config/dev.exs`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `npm install`
  * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.
