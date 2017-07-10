defmodule Chesquire.User do
  use Chesquire.Web, :model

  schema "users" do
    field :handle, :string
    field :name, :string
    field :encrypt_pass, :string
    field :email, :string
    field :apikey, :string
    field :disabled, :boolean, default: false
    field :password_changed, Ecto.DateTime
    field :password, :string, virtual: true

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:handle, :name, :password, :email, :apikey, :disabled, :password_changed])
    |> validate_required([:handle, :name, :password, :email, :apikey, :disabled, :password_changed])
    |> unique_constraint(:handle)
    |> unique_constraint(:email)
  end

  def reg_changeset(struct, params \\ %{}) do
    struct
    |> changeset(params)
    |> cast(params, [:password], [])
    |> validate_length(:password, min: 6)
    |> hash_pw()
  end

  defp hash_pw(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: p}} ->
        put_change(changeset, :encrypt_pass, Comeonin.Bcrypt.hashpwsalt(p))
      _ -> 
        changeset
    end
  end
end
