# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :chesquire,
  ecto_repos: [Chesquire.Repo]

# Configures the endpoint
config :chesquire, Chesquire.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "PjSg1osDCHl+TdLJuzfGwtKAxQdkVfmvW7dLE4Rn5qfYlNpAkQhmNGTYWBLNdCDm",
  render_errors: [view: Chesquire.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Chesquire.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
config :guardian, Guardian,
  allowed_algos: ["HS512"], # optional
  verify_module: Guardian.JWT,  # optional
  issuer: "Chesquire",
  ttl: { 30, :days },
  allowed_drift: 2000,
  verify_issuer: true, # optional
  secret_key: "vy2wz2m/+PaMVS1oFvk1SI9jCIDTfZAAWWBiPaqf32vhG3vqjB2EXIn/acb/rc0X",
  serializer: Chesquire.GuardianSerializer



import_config "#{Mix.env}.exs"
